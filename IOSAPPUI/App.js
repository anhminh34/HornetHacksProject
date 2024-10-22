import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Home from './UIfiles/Home';  // Import the Home screen component
import Cafe from './UIfiles/Cafe';  // Import the Cafe screen component

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Defining the Home screen */}
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}  // Hides the header
                />
                <Stack.Screen
                    name="Cafe"
                    component={Cafe}
                    options={{ headerShown: false }}  // Hides the header
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
