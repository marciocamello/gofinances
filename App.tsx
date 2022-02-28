import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import 'intl/locale-data/jsonp/pt-PT';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { Signin } from './src/screens/Signin';
import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {

    const { userStorageLoading } = useAuth();

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded || userStorageLoading) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.colors.primary}
            />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    );
}
