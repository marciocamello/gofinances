import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppSgv from '../../assets/apple.svg';
import GoogleSgv from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SigninSocialButton } from '../../components/SigninSocialButton';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignTitle,
    Footer,
    FooterWrapper,
} from './styles';

export function Signin() {
    const [isLoading, setIsLoading] = useState(true);
    const { signWithInGoogle, signWithApple } = useAuth();

    const theme = useTheme();

    async function handleSignWithInGoogle() {

        try {
            setIsLoading(true);
            return await signWithInGoogle();

        } catch (error) {
            console.log(error);
            Alert.alert('Error login with google');
            setIsLoading(false);
        }
    }

    async function handleSignWithApple() {

        try {
            setIsLoading(true);
            return await signWithApple();

        } catch (error) {
            console.log(error);
            Alert.alert('Error login with apple');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        control your {'\n'}
                        shape finance {'\n'}
                        very simple
                    </Title>
                </TitleWrapper>
                <SignTitle>
                    Login with {'\n'}
                    one of the accounts below
                </SignTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SigninSocialButton
                        title="Sign in with Google"
                        svg={GoogleSgv}
                        onPress={handleSignWithInGoogle}
                    />
                    {Platform.OS === 'ios' && (
                        <SigninSocialButton
                            title="Sign in with Apple"
                            svg={AppSgv}
                            onPress={handleSignWithApple}
                        />
                    )}
                </FooterWrapper>
            </Footer>

            {isLoading && (
                <ActivityIndicator
                    color={theme.colors.shape}
                    style={{
                        marginTop: RFValue(18),
                    }}
                />
            )}
        </Container>
    );
}