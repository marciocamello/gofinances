import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export function Profile() {
    return (
        <View>
            <Text testID="text-title">Profile</Text>

            <TextInput
                testID="input-name"
                placeholder='Nome'
                autoCorrect={false}
                value='Marcio'
            />

            <TextInput
                testID="input-surname"
                placeholder='Sobrenome'
                value='Camello'
            />

            <Button
                testID="button-save"
                title='Salvar'
                onPress={() => { }}
            />
        </View>
    );
}