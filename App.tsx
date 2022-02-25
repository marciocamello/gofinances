import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { Register } from './src/screens/Register';
import { StatusBar } from 'react-native';

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
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.colors.primary}
            />
            <Register />
        </ThemeProvider>
    );
}
