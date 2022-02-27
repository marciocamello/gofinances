import React from 'react';

import {
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { HistoryCard } from '../../components/HistoryCard';

import {
    Container,
    Header,
    Title
} from './styles';

export function Resume() {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Resume</Title>
                </Header>

                <HistoryCard
                    color="red"
                    title="Entries"
                    amount="R$ 0,00"
                />

            </Container>
        </TouchableWithoutFeedback>
    );
}