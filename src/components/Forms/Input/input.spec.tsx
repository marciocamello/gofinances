import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Input Component', () => {

    it('must have specific border colo when active', () => {
        const { getByTestId } = render(
            <Input
                testID='input-email'
                placeholder="Email"
                keyboardType='email-address'
                autoCorrect={false}
                active={true}
            />,
            {
                wrapper: Providers
            }
        );

        const inputEmail = getByTestId('input-email');

        expect(inputEmail.props.style[0].borderColor)
            .toEqual(theme.colors.attention);

        expect(inputEmail.props.style[0].borderWidth)
            .toEqual(3);
    });
});