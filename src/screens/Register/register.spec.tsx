import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import theme from '../../global/styles/theme';

import { Register } from './';

const Providers: React.FC = ({ children }) => {
    return <NavigationContainer>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </NavigationContainer>
};

describe('Register Screen', () => {

    it('should be able to render', () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );

        const registerScreen = getByTestId('register-screen');
        expect(registerScreen).toBeTruthy();

    });

    it('should be open category modal when user click on button', () => {

        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );

        const categoryModal = getByTestId('category-modal');
        const categoryModalButton = getByTestId('category-modal-button');
        fireEvent.press(categoryModalButton);

        expect(categoryModal.props.visible).toBeTruthy();

    });

});