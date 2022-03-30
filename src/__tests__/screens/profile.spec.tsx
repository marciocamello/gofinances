import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {

    it('should render title', () => {

        const { getByTestId } = render(<Profile />);

        const title = getByTestId('text-title');

        expect(title.props.children).toContain('Profile');
    });

    it('should render the placeholder for the name input', () => {
        const { getByPlaceholderText } = render(<Profile />);

        const input = getByPlaceholderText('Nome');

        expect(input).toBeTruthy();
    });

    it('should render the name and surname data', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('Marcio');
        expect(inputSurname.props.value).toEqual('Camello');
    });
});
