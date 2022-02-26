import React, { useEffect, useState } from 'react';

import {
    Alert,
    Keyboard,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { AppRoutesParamList } from '../../routes/app.routes';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';
import { dataKey, defaultCategory } from '../../utils/data';

interface FormData {
    [key: string]: string;
}


const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required'),
    amount: Yup
        .number()
        .typeError('Please enter a valid number')
        .positive('Price must be greater than zero')
        .required('Price is required')
});

type RegisterNavigationProps = BottomTabNavigationProp<
    AppRoutesParamList
>;

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState(defaultCategory);

    const nagivation = useNavigation<RegisterNavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'income' | 'expense') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    useEffect(() => {
        async function loadTransactions() {
            const transactions = await AsyncStorage.getItem(dataKey);
            console.log(transactions);
        }

        loadTransactions();

        async function removeAll() {
            await AsyncStorage.removeItem(dataKey);
        }

        //removeAll();
    }, []);

    async function handleRegister(form: FormData) {
        if (!transactionType) {
            return Alert.alert('Select a transaction type');
        }

        if (category.key === 'category') {
            return Alert.alert('Select a category');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            await AsyncStorage.setItem(
                dataKey,
                JSON.stringify([...JSON.parse(await AsyncStorage.getItem(dataKey) || '[]'), newTransaction])
            );

            setTransactionType('');
            setCategory(defaultCategory);
            reset();

            nagivation.navigate('List');

        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Something went wrong');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Register</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            placeholder="Name"
                            control={control}
                            name="name"
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            placeholder="Amount"
                            control={control}
                            name="amount"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button
                        title="Send"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal
                    visible={categoryModalOpen}
                >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}