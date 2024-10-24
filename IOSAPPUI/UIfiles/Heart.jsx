import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ComingSoonScreen = ({ navigation }) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={require('../assets/images/heartbackground.jpg')} // Replace with your background image path
                style={styles.backgroundImage}
            />

            {/* Coming Soon Text */}
            <View style={styles.textContainer}>
                <Text style={styles.comingSoonText} allowFontScaling={false}>COMING SOON</Text>
            </View>

            {/* Bottom Navigation Bar */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0,
    },
    textContainer: {
        position: 'absolute',
        top: height * 0.3,
        alignItems: 'center',
    },
    comingSoonText: {
        fontSize: height * 0.06,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    // Navigation Bar
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
    // Active tab style
    activeNavButton: {
        backgroundColor: '#ff7eb3',
        borderRadius: 10,
    },
});

export default ComingSoonScreen;
