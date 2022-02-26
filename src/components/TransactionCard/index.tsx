import React from 'react';

import { categories } from '../../utils/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Icon,
    Category,
    CategoryName,
    Date,
} from './styles';

interface Category {
    key: string;
    name: string;
    icon: string;
    color?: string;
}

export interface TransactionCardProps {
    id: string;
    transactionType: 'income' | 'expense';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
    const category = categories.find((category: Category) => category.key === data.category);

    return (
        <Container>
            <Title>
                {data.name}
            </Title>
            <Amount type={data.transactionType}>
                {data.transactionType === 'expense' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category?.icon} />
                    <CategoryName>
                        {category?.name}
                    </CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}