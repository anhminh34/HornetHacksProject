import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Modal, Animated } from 'react-native';
import LoadingScreen from './Loading'; // Import the LoadingScreen component
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

const loadFonts = async () => {
    await Font.loadAsync({
        'Jomhuria-Regular': require('../assets/fonts/Jomhuria-Regular.ttf'),
    });
};

const HomeScreen = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current; // Create animated value for scaling

    useEffect(() => {
        const loadResources = async () => {
            await loadFonts();
            setFontsLoaded(true);
            await SplashScreen.hideAsync();
        };

        loadResources();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    const handlePlayPress = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Cafe');
        }, 3000);
    };

    const showModal = () => {
        setModalVisible(true);
        Animated.timing(scaleAnim, {
            toValue: 1, // Scale to full size
            duration: 150, // Animation duration in milliseconds
            useNativeDriver: true,
        }).start();
    };

    const hideModal = () => {
        Animated.timing(scaleAnim, {
            toValue: 0, // Scale back to hidden
            duration: 150,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    return (
        <View style={styles.container}>
            {/* City with Shadow */}
            <View style={styles.cityContainer}>
                <Image
                    source={require('../assets/images/city1.png')}
                    style={styles.backgroundImage}
                />
            </View>

            {/* Cafe with Shadow */}
            <View style={styles.cafeContainer}>
                <Image
                    source={require('../assets/images/cafe.png')}
                    style={styles.backgroundImage}
                />
            </View>

            {/* Title */}
            <View style={styles.titleButton}>
                <Text style={styles.title} allowFontScaling={false}>COFFEE SHOP</Text>
            </View>

            {/* Map Button */}
            <TouchableOpacity onPress={showModal} style={styles.mapButton}>
                <View style={styles.mapButtonCircle}>
                    <Image source={require('../assets/icons/mapIcon.png')} style={styles.mapIcon} />
                </View>
            </TouchableOpacity>

            {/* Play Button */}
            <TouchableOpacity
                style={[styles.playButton, styles.shadow]}
                activeOpacity={0.7}
                onPress={handlePlayPress}
            >
                <Text style={styles.playButtonText} allowFontScaling={false}>PLAY</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.navigationBar}>
                <TouchableOpacity
                    style={[styles.navButton, currentRoute === 'Home' ? styles.activeNavButton : null]}
                    onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/homeIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, currentRoute === 'Leaderboard' ? styles.activeNavButton : null]}
                    onPress={() => navigation.navigate('Leaderboard')}>
                    <Image source={require('../assets/icons/leaderboardIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, currentRoute === 'Heart' ? styles.activeNavButton : null]}
                    onPress={() => navigation.navigate('Heart')}>
                    <Image source={require('../assets/icons/loveIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, currentRoute === 'Settings' ? styles.activeNavButton : null]}
                    onPress={() => navigation.navigate('Settings')}>
                    <Image source={require('../assets/icons/settingsIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
            </View>

            {/* Modal for the list of places */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={hideModal}
            >
                <View style={styles.overlayContainer}>
                    <Animated.View style={[styles.overlayContent, { transform: [{ scale: scaleAnim }] }]}>
                        {/* Scrollable list of places */}
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 1 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>Coffee Shop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 2 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>Fancy Restaurant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 3 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>Movie Theatre</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 4 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>Amusement Park</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 5 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>Beach</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={() => console.log('Place 6 clicked')}>
                                <Text style={styles.placeText} allowFontScaling={false}>House</Text>
                            </TouchableOpacity>
                        </ScrollView>

                        {/* Close Button */}
                        <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                            <Image source={require('../assets/icons/xIcon.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
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
        top: '10%',
        backgroundColor: '#6C3429',
        borderRadius: 50,
        paddingHorizontal: '10%',
        height: height * 0.08,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: height * 0.06,
        color: '#FFE5C2',
        fontFamily: 'Jomhuria-Regular',
        fontWeight: 'bold',
        lineHeight: height * 0.06,
        marginVertical: 0,
    },
    mapButton: {
        position: 'absolute',
        top: height * 0.22,
        left: width * 0.035,
        zIndex: 10,
    },
    mapButtonCircle: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    playButton: {
        backgroundColor: '#3EAC36',
        borderRadius: 50,
        width: width * 0.45,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
    },
    playButtonText: {
        color: '#fff',
        fontSize: height * 0.06,
        fontFamily: 'Jomhuria-Regular',
        fontWeight: 'bold',
        lineHeight: height * 0.07,
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
    activeNavButton: {
        backgroundColor: '#ff7eb3',
        borderRadius: 10,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayContent: {
        width: '85%',
        height: '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 20,
        position: 'relative',
    },
    scrollContainer: {
        paddingTop: 20,
    },
    placeButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    placeText: {
        fontSize: height * 0.025,
        color: '#333',
    },
    closeButton: {
        position: 'absolute',
        top: height * 0.01,   // Adjusts the top margin based on screen height
        right: width * 0.02,  // Adjusts the right margin based on screen width
        zIndex: 10,
    },
    closeIcon: {
        width: height * 0.035,  // Adjusts icon size based on screen height
        height: height * 0.035, // Ensures the icon is square
        resizeMode: 'contain',
    },
});

export default HomeScreen;
