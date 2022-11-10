import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import TimerNavigation from './resources/navigation/TimerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <TimerNavigation/>
    </NavigationContainer>
  );
}

