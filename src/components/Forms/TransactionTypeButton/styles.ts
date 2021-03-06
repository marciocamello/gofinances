import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
    type: 'income' | 'expense';
};

interface ContainerProps {
    isActive: boolean;
    type: 'income' | 'expense';
}

export const Container = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7
}) <ContainerProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width: ${({ isActive, type }) => isActive ? 0 : 1.5}px;
    border-style:  solid;
    border-color:  ${({ theme }) => theme.colors.text};
    border-radius: 5px;

    padding: 16px;

    ${({ isActive, type }) => isActive && type === 'income' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};

    ${({ isActive, type }) => isActive && type === 'expense' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};
`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }) =>
        type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;
