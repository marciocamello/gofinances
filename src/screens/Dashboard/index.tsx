import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { currency, dataKey, language } from '../../utils/data';
import { formatAmount, formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/auth';

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
    const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);
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

    const { signOut, user } = useAuth();

    function getLastransactionDate(
        collection: TransactionCardProps[],
        type: 'income' | 'expense'
    ) {

        const collectionFilttered = collection
            .filter(transaction => transaction.transactionType === type);

        if (collectionFilttered.length === 0) {
            return 0;
        }

        const lastTransacton = new Date(Math.max.apply(Math,
            collectionFilttered.map((transaction: TransactionCardProps) => new Date(transaction.date).getTime())
        ));

        return `${lastTransacton.getDate()} at ${lastTransacton.toLocaleDateString(language, {
            month: 'long',
        })}`;
    }

    async function loadTransaction() {
        const response = await AsyncStorage.getItem(`${dataKey}:transactions_user:${user.id}`);

        let entriesSum = 0;
        let expensiveSum = 0;

        if (response) {

            const transactionsData = JSON.parse(response);
            const transactionsList: TransactionCardProps[] = transactionsData.map((transaction: TransactionCardProps) => {

                if (transaction.transactionType === 'income') {
                    entriesSum += Number(transaction.amount);
                } else {
                    expensiveSum += Number(transaction.amount);
                }

                const amount = formatAmount(Number(transaction.amount));

                const date = formatDate(transaction.date);

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
            const totalInterval = lastTransactionsExpenses === 0
                ? 'No entries'
                : `01 at ${lastTransactionsExpenses}`;

            setHighlighData({
                entries: {
                    amount: entriesSum.toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    }),
                    lasTransaction: lastTransactionsEntries === 0
                        ? 'No entries'
                        : `Last entry ${lastTransactionsEntries}`
                },
                expenses: {
                    amount: expensiveSum.toLocaleString(language, {
                        style: 'currency',
                        currency: currency
                    }),
                    lasTransaction: lastTransactionsExpenses === 0
                        ? 'No entries'
                        : `Last entry ${lastTransactionsExpenses}`
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

    async function handleSignOut() {

        try {
            setIsLoading(true);
            return await signOut();

        } catch (error) {
            console.log(error);
            Alert.alert('Error signing out', 'An error occurred while signing out');
        } finally {
            setIsLoading(false);
        }
    }

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
                                    <Photo source={{ uri: user.photo }} />
                                    <User>
                                        <UserGreating>Hello</UserGreating>
                                        <UserName>{user.name}</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton
                                    onPress={handleSignOut}
                                    activeOpacity={0.7}
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