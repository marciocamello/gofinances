import React, { useEffect } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { currency, dataKey, language } from '../../utils/data';

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
    LogoutButton
} from './styles';
import { categories } from '../../utils/categories';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = React.useState<DataListProps[]>([]);

    async function loadTransaction() {
        const response = await AsyncStorage.getItem(dataKey);

        if (response) {

            const transactions = JSON.parse(response);
            const transactionsList: DataListProps[] = transactions.map((transaction: TransactionCardProps) => {

                const amount = Number(transaction.amount)
                    .toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    });

                const date = Intl.DateTimeFormat(language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(transaction.date));

                return {
                    id: transaction.id,
                    name: transaction.name,
                    amount,
                    type: transaction.type,
                    category: transaction.category,
                    date
                };
            });

            setData(transactionsList);
        }
    }

    useEffect(() => {
        loadTransaction();
    }, []);

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
                    <LogoutButton
                        onPress={() => { }}
                    >
                        <Icon name="power" />
                    </LogoutButton>
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