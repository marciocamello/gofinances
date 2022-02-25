import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'income' | 'expense') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Register</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Name"
                    />

                    <Input
                        placeholder="Price"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton
                            title="Income"
                            type="income"
                            onPress={() => handleTransactionTypeSelect('income')}
                            isActive={transactionType === 'income'}
                        />

                        <TransactionTypeButton
                            title="Expense"
                            type="expense"
                            onPress={() => handleTransactionTypeSelect('expense')}
                            isActive={transactionType === 'expense'}
                        />
                    </TransactionTypes>

                    <CategorySelect
                        title="Category"
                    />
                </Fields>

                <Button
                    title="Send"
                />
            </Form>
        </Container>
    );
}