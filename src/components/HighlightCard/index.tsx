import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Ammount,
    LastTransaction,
} from './styles';

export function HighlightCard() {
    return (
        <Container>
            <Header>
                <Title>Input</Title>
                <Icon name="arrow-up-circle"></Icon>
            </Header>

            <Footer>
                <Ammount>R$ 17.400,00</Ammount>
                <LastTransaction>Last input at: 12/12/2020</LastTransaction>
            </Footer>
        </Container>
    )
}