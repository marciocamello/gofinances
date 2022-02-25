import React from 'react';
import { TouchableOpacityProps } from 'react-native';


import {
    Container,
    Icon,
    Title,
} from './styles';

const icons = {
    income: 'arrow-up-circle',
    expense: 'arrow-down-circle',
};

interface Props extends TouchableOpacityProps {
    type: 'income' | 'expense';
    title: string;
    isActive: boolean;
}

export function TransactionTypeButton({
    type,
    title,
    isActive,
    ...rest
}: Props) {
    return (
        <Container
            {...rest}
            type={type}
            isActive={isActive}
        >
            <Icon
                name={icons[type]}
                type={type}
            />
            <Title>
                {title}
            </Title>
        </Container>
    );
}