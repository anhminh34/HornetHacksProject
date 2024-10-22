import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
    const bounceAnim = useRef(new Animated.Value(0)).current; // Animated value for bounce effect
    const fadeAnim = useRef(new Animated.Value(0)).current;   // Animated value for fade effect

    useEffect(() => {
        // Bounce animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -30, // Move up by 30 units
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0, // Move back down
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Fade-in animation for the text
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to full opacity
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    { transform: [{ translateY: bounceAnim }] }, // Apply bounce animation to the logo
                ]}
            >
                <Image
                    source={require('../assets/images/heart.png')} // Replace with your logo path
                    style={styles.logo}
                />
            </Animated.View>

            <Animated.Text
                style={[
                    styles.loadingText,
                    { opacity: fadeAnim }, // Apply fade-in effect to the text
                ]}
            >
                Love with all your might
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7', // Background color for the loading screen
    },
    logoContainer: {
        marginBottom: 50,
    },
    logo: {
        width: width * 0.5, // Adjust the logo size to half the screen width
        height: width * 0.5,
        resizeMode: 'contain',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Darker text color for contrast
    },
});

export default LoadingScreen;
