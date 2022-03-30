import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authUrl, googleApiUrl } from '../utils/social/google';
import { dataKey } from '../utils/data';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signWithInGoogle: () => Promise<void>;
    signWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    useEffect(() => {
        async function loadUserStorageData() {
            const userStored = await AsyncStorage.getItem(`${dataKey}:users`);

            if (userStored) {
                const userLogged = JSON.parse(userStored) as User;
                setUser(userLogged);
            }

            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, []);

    async function signWithInGoogle() {
        try {
            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {

                const response = await fetch(`${googleApiUrl}/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const userLogged = {
                    id: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    photo: userInfo.picture,
                };

                setUser(userLogged);
                await AsyncStorage.setItem(`${dataKey}:users`, JSON.stringify(userLogged));
            }

        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    async function signWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            if (credential) {

                const userLogged = {
                    id: String(credential.user),
                    name: credential.fullName!.givenName!,
                    email: credential.email!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName}`,
                };

                setUser(userLogged);
                await AsyncStorage.setItem(`${dataKey}:users`, JSON.stringify(userLogged));
            }

        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(`${dataKey}:users`);
    }

    return (
        <AuthContext.Provider value={{
            user,
            signWithInGoogle,
            signWithApple,
            signOut,
            userStorageLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}