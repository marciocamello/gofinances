import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HilightsProps {
    amount: string;
    lasTransaction: string;
}

interface HighlightData {
    entries: HilightsProps;
    expenses: HilightsProps;
    total: HilightsProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlighData, setHighlighData] = useState<HighlightData>({
        entries: {
            amount: '0',
            lasTransaction: ''
        },
        expenses: {
            amount: '0',
            lasTransaction: ''
        },
        total: {
            amount: '0',
            lasTransaction: ''
        }
    });

    const theme = useTheme();

    function getLastransactionDate(
        collection: DataListProps[],
        type: 'income' | 'expense'
    ) {

        const lastTransacton = new Date(Math.max.apply(Math,
            collection
                .filter(transaction => transaction.transactionType === type)
                .map((transaction: DataListProps) => new Date(transaction.date).getTime())
        ));

        return `${lastTransacton.getDate()} at ${lastTransacton.toLocaleDateString(language, {
            month: 'long',
        })}`;
    }

    async function loadTransaction() {
        const response = await AsyncStorage.getItem(dataKey);

        let entriesSum = 0;
        let expensiveSum = 0;

        if (response) {

            const transactionsData = JSON.parse(response);
            const transactionsList: DataListProps[] = transactionsData.map((transaction: TransactionCardProps) => {

                if (transaction.transactionType === 'income') {
                    entriesSum += Number(transaction.amount);
                } else {
                    expensiveSum += Number(transaction.amount);
                }

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
                    transactionType: transaction.transactionType,
                    category: transaction.category,
                    date
                };
            });

            setTransactions(transactionsList);

            const lastTransactionsEntries = getLastransactionDate(transactionsList, 'income');
            const lastTransactionsExpenses = getLastransactionDate(transactionsList, 'expense');
            const totalInterval = `01 at ${lastTransactionsExpenses}`;

            setHighlighData({
                entries: {
                    amount: entriesSum.toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    }),
                    lasTransaction: `Last entry ${lastTransactionsEntries}`
                },
                expenses: {
                    amount: expensiveSum.toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    }),
                    lasTransaction: `Last entry ${lastTransactionsExpenses}`
                },
                total: {
                    amount: (entriesSum - expensiveSum).toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    }),
                    lasTransaction: totalInterval
                },
            });
        }

        setIsLoading(false);
    }

    useEffect(() => {
        //AsyncStorage.removeItem(dataKey);
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

    return (
        <Container>
            {
                isLoading
                    ? <LoadContainer>
                        <ActivityIndicator color={theme.colors.attention} />
                    </LoadContainer>
                    : <>
                        <Header >
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
                                amount={highlighData.entries.amount}
                                lastTransaction={highlighData.entries.lasTransaction}
                                type="income"
                            />
                            <HighlightCard
                                title="Expenses"
                                amount={highlighData.expenses.amount}
                                lastTransaction={highlighData.expenses.lasTransaction}
                                type="expense"
                            />
                            <HighlightCard
                                title="Total"
                                amount={highlighData.total.amount}
                                lastTransaction={highlighData.total.lasTransaction}
                                type="total"
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Transactions</Title>

                            <TransactionsList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />
                        </Transactions>
                    </>
            }
        </Container >
    )
}