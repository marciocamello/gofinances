import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import { VictoryPie } from 'victory-native';
import { dataKey, dateLang } from '../../utils/data';

import { HistoryCard } from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { formatAmount } from '../../utils/helpers';

import {
    ChartContainer,
    Container,
    Content,
    Header,
    Title,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from './styles';

interface CategoryData {
    key: string;
    name: string;
    total: number;
    percent: string;
    color: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    const { user } = useAuth();

    function handleDateChange(action: "next" | "prev") {
        if (action === "next") {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const response = await AsyncStorage.getItem(`${dataKey}:transactions_user:${user.id}`);
        const currentData = response ? JSON.parse(response) : [];

        const expenses = currentData
            .filter((expense: TransactionCardProps) =>
                expense.transactionType === 'expense' &&
                new Date(expense.date).getMonth() === selectedDate.getMonth() &&
                new Date(expense.date).getFullYear() === selectedDate.getFullYear()
            );

        const expensesTotal = expenses.reduce((accumulator: number, expense: TransactionCardProps) => {
            return accumulator + Number(expense.amount);
        }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expenses.forEach((expense: TransactionCardProps) => {
                if (expense.category === category.key) {

                    categorySum += Number(expense.amount);
                }
            });

            if (categorySum > 0) {

                const total = categorySum;

                const percent = `${(total / expensesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total,
                    percent,
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Resume</Title>
                </Header>
                {
                    isLoading
                        ? <LoadContainer>
                            <ActivityIndicator color={theme.colors.attention} />
                        </LoadContainer>
                        : <Content
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 24,
                                paddingBottom: useBottomTabBarHeight(),
                            }}
                        >
                            <MonthSelect>
                                <MonthSelectButton onPress={() => handleDateChange("prev")}>
                                    <MonthSelectIcon name="chevron-left" />
                                </MonthSelectButton>

                                <Month >
                                    {format(selectedDate, "MMMM yyyy", {
                                        locale: dateLang
                                    })}
                                </Month>

                                <MonthSelectButton onPress={() => handleDateChange("next")}>
                                    <MonthSelectIcon name="chevron-right" />
                                </MonthSelectButton>
                            </MonthSelect>

                            <ChartContainer>
                                <VictoryPie
                                    data={totalByCategories}
                                    colorScale={totalByCategories.map(category => category.color)}
                                    style={{
                                        labels: {
                                            fontSize: RFValue(18),
                                            fontWeight: 'bold',
                                            fill: theme.colors.shape,
                                        }
                                    }}
                                    labelRadius={50}
                                    x="percent"
                                    y="total"
                                />
                            </ChartContainer>
                            {
                                totalByCategories.map(item => (
                                    <HistoryCard
                                        key={item.key}
                                        color={item.color}
                                        title={item.name}
                                        amount={formatAmount(item.total)}
                                    />
                                ))
                            }
                        </Content>
                }
            </Container>
        </TouchableWithoutFeedback>
    );
}