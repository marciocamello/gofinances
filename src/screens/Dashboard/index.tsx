import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
    Container,
    Header,
    UserrWrapper,
    UserInfo,
    Photo,
    UserGreating,
    User,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    TransactionsList,
    Title,
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'income',
            title: "Salary",
            amount: "R$ 17.400,00",
            category: {
                name: 'Salary',
                icon: 'dollar-sign',
            },
            date: "13/04/2020",
        },
        {
            id: '2',
            type: 'expense',
            title: "Food",
            amount: "R$ 59,00",
            category: {
                name: 'Salary',
                icon: 'coffee',
            },
            date: "10/04/2020",
        },
        {
            id: '3',
            type: 'income',
            title: "Ecommerce",
            amount: "R$ 1.400,00",
            category: {
                name: 'Salary',
                icon: 'shopping-bag',
            },
            date: "13/01/2020",
        }
    ];

    return (
        <Container>
            <Header>
                <UserrWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https:github.com/marciocamello.png' }} />
                        <User>
                            <UserGreating>Hello</UserGreating>
                            <UserName>Marcio</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserrWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    title="Income"
                    amount="R$ 17.400,00"
                    lastTransaction="Last entry April 13th"
                    type="income"
                />
                <HighlightCard
                    title="Expenses"
                    amount="R$ 1.259,00"
                    lastTransaction="Last entry April 03th"
                    type="expense"
                />
                <HighlightCard
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="April 01 to 16"
                    type="total"
                />
            </HighlightCards>

            <Transactions>
                <Title>Transactions</Title>

                <TransactionsList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}