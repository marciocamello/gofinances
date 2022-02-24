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

interface Props {
    type: 'income' | 'expense' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    income: 'arrow-up-circle',
    expense: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function HighlightCard({
    type,
    title,
    amount,
    lastTransaction,
}: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>
                    {title}
                </Title>
                <Icon name={icon[type]} type={type}></Icon>
            </Header>

            <Footer>
                <Ammount type={type}>
                    {amount}
                </Ammount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}