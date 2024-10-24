import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import LoadingScreen from './Loading'; // Import the LoadingScreen component
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen from expo-splash-screen

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');

// Function to load custom fonts
const loadFonts = async () => {
    await Font.loadAsync({
        'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf'), // Path to your font file
    });
};

const HomeScreen = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Control when to show the loading screen

    // Load the font before rendering
    useEffect(() => {
        const loadResources = async () => {
            await loadFonts();
            setFontsLoaded(true);
            await SplashScreen.hideAsync(); // Hide the splash screen
        };

        loadResources();
    }, []);

    if (!fontsLoaded) {
        return null; // Prevent rendering until fonts are loaded
    }

    const handlePlayPress = () => {
        // Show the loading screen
        setIsLoading(true);

        // Delay for a few seconds (e.g., 3 seco    nds) then navigate to CafeScreen
        setTimeout(() => {
            setIsLoading(false); // Hide the loading screen
            navigation.navigate('Cafe'); // Navigate to CafeScreen after loading
        }, 3000); // 3000 ms = 3 seconds delay
    };

    if (isLoading) {
        return <LoadingScreen />; // Show the loading screen during the delay
    }

    return (
        <View style={styles.container}>
            {/* City with Shadow */}
            <View style={styles.cityContainer}>
                <Image
                    source={require('../assets/images/city1.png')}  // Background image path
                    style={styles.backgroundImage}  // Custom style for image positioning
                />
            </View>
            {/* Cafe with Shadow */}
            <View style={styles.cafeContainer}>
                <Image
                    source={require('../assets/images/cafe.png')}  // Background image path
                    style={styles.backgroundImage}  // Custom style for image positioning
                />
            </View>

            {/* Title */}
            <View style={styles.titleButton}>
                <Text style={styles.title}>COFFEE SHOP</Text>
            </View>

            {/* Play Button */}
            <TouchableOpacity
                style={[styles.playButton, styles.shadow]}
                activeOpacity={0.7}  // Adjust the opacity level when pressed
                onPress={handlePlayPress}
            >
                <Text style={styles.playButtonText}>PLAY</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton}>
                    <Image source={require('../assets/icons/homeIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Leaderboard')}>
                    <Image source={require('../assets/icons/leaderboardIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Image source={require('../assets/icons/loveIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Settings')}>
                    <Image source={require('../assets/icons/settingsIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#83C6EA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityContainer: {
        position: 'absolute',
        bottom: height * 0.06,
        left: '50%',
        marginLeft: -width * 0.55,
        width: width * 1.1,
        height: height * 0.55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 8,
    },
    cafeContainer: {
        position: 'absolute',
        bottom: height * 0.06,
        left: '50%',
        marginLeft: -(width * 1.1 / 2) / 2,
        width: width * 1.1 / 2,
        height: height * 0.55 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 8,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    titleButton: {
        position: 'absolute',
        top: '10%',  // Make the position relative to screen height
        backgroundColor: '#6C3429',
        borderRadius: 50,
        paddingHorizontal: '10%',  // Use percentages for padding
        height: height * 0.08,  // Make height relative to screen height
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: height * 0.06,  // Font size relative to screen height
        color: '#FFE5C2',
        fontFamily: 'Jomhuria-Regular',
        fontWeight: 'bold',
        lineHeight: height * 0.06,  // Set lineHeight to match font size
        marginVertical: 0,
    },
    playButton: {
        backgroundColor: '#3EAC36',
        borderRadius: 50,
        width: width * 0.45,    // Set width relative to screen width
        height: height * 0.06,    // Set height relative to screen height
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',  // Use percentage for marginTop for better responsiveness
    },
    playButtonText: {
        color: '#fff',
        fontSize: height * 0.06,  // Set font size relative to screen height
        fontFamily: 'Jomhuria-Regular',
        fontWeight: 'bold',
        lineHeight: height * 0.07,   // Set lineHeight equal to fontSize for centering
        paddingBottom: height * 0.01,
    },
    navigationBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: '#23171E',
        paddingBottom: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#FFF',
    },
    navButton: {
        padding: 10,
    },
    navIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },
});


export default HomeScreen;
