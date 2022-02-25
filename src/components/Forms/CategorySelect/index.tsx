import React from 'react';
import { } from 'react-native';

import {
    Container,
    Category,
    Icon,
} from './styles';

interface Props {
    title: string;
}

export function CategorySelect({ title }: Props) {
    return (
        <Container>
            <Category>
                {title}
            </Category>
            <Icon name="chevron-down" />
        </Container>
    );
}