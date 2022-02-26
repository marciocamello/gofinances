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

import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './src/routes/app.routes';

export default function App() {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.colors.primary}
                />
                <AppNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}
