import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './UIfiles/Home';  // Import the Home screen component
import Cafe from './UIfiles/Cafe';  // Import the Cafe screen component
import Settings from './UIfiles/Settings';
import { ImageProvider } from './UIfiles/ImageContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ImageProvider>
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
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ headerShown: false }}  // Hides the header
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ImageProvider>
    );
}
