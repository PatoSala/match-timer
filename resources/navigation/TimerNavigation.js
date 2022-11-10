import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import NewTimerScreen from '../screens/NewTimerScreen';
import TimeViewerScreen from '../screens/TimeViewerScreen';
import AlternateTimerScreen from '../screens/AlternateTimer'

const Stack = createNativeStackNavigator();

function TimerNavigation() {
    return (
        <Stack.Navigator>

            <Stack.Screen 
                name="NewTimer" 
                component={NewTimerScreen} 
                options={{
                    title: 'New'
                }}
            />

            <Stack.Screen
                name="TimeViewer"
                component={TimeViewerScreen}
                options={{
                    title: 'Timer',
                    presentation: 'fullScreenModal'
                }}
            />
        </Stack.Navigator>
    )
}

export default TimerNavigation;