import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';
import { Platform } from 'react-native';

export type AppRoutesParamList = {
    List: undefined; // <- undefined = rota não requer parâmetros.
    Register: undefined;
    Resume: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export function AppNavigator() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 72,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen
                name="List"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialIcons
                            name="format-list-bulleted"
                            color={color}
                            size={size}
                        />,
                }}
            />
            <Screen
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialIcons
                            name="attach-money"
                            color={color}
                            size={size}
                        />,
                }}
            />
            <Screen
                name="Resume"
                component={Resume}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialIcons
                            name="pie-chart"
                            color={color}
                            size={size}
                        />,
                }}
            />
        </Navigator>
    );
}