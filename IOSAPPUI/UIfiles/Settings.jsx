import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
import { ImageContext } from './ImageContext';  // Import the context

const { width, height } = Dimensions.get('window');  // Get screen dimensions for responsiveness

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    // Use context values for images
    const {
        selectedBannerImage,
        setSelectedBannerImage,
        selectedProfileImage,
        setSelectedProfileImage
    } = useContext(ImageContext);  // Access ImageContext

    const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

    // Function to pick banner image
    const pickBannerImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "You need to grant permission to access your photo library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets[0].uri) {
            setSelectedBannerImage(result.assets[0].uri);  // Save the selected image in context
        }
    };

    // Function to pick profile image
    const pickProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "You need to grant permission to access your photo library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets[0].uri) {
            setSelectedProfileImage(result.assets[0].uri);  // Save the selected image in context
        }
    };

    return (
        <View style={styles.container}>
            {/* Banner Section */}
            <TouchableOpacity onPress={pickBannerImage}>
                <View style={styles.banner}>
                    <Image
                        source={selectedBannerImage ? { uri: selectedBannerImage } : require('../assets/images/defaultbanner.png')}
                        style={styles.bannerImage}
                    />
                    {/* Profile Picture positioned at bottom-left of the banner */}
                    <TouchableOpacity onPress={pickProfileImage} style={styles.profilePictureWrapper}>
                        <Image
                            source={selectedProfileImage ? { uri: selectedProfileImage } : { uri: 'https://i.pinimg.com/736x/4f/c8/57/4fc857f11d2a6d610b7a9cffb0d71655.jpg' }}
                            style={styles.profilePicture}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* Settings UI */}
            <View style={styles.settingsContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.profileName}>Username</Text>
                    <Text style={styles.rank}>Clueless</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Notifications</Text>
                        <Switch
                            onValueChange={toggleNotifications}
                            value={notificationsEnabled}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Manage Account</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </View>

            {/* Bottom Navigation */}
            <View style={styles.navigationBar}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/homeIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23171E',
    },
    banner: {
        width: '100%',
        height: height * 0.35,  // Responsive banner height (35% of screen height)
        position: 'relative',
        backgroundColor: '#ddd',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profilePictureWrapper: {
        position: 'absolute',
        left: width * 0.05,  // Position it 5% from the left of the screen
        bottom: -height * 0.04,  // Responsive bottom positioning (6% of screen height)
        width: width * 0.25,  // Profile picture size relative to screen width (25%)
        height: width * 0.25,  // Keep it square
    },
    profilePicture: {
        width: '100%',  // Use 100% of the wrapper's width and height
        height: '100%',
        borderRadius: width * 0.125,  // Half of the width for a perfect circle
        borderWidth: 3,
        borderColor: '#23171E',
    },
    settingsContainer: {
        marginTop: 20,
        padding: 20,
        paddingBottom: 80,  // Add padding at the bottom to avoid content overlap with the nav bar
    },
    profileName: {
        fontSize: height * 0.025,  // Responsive font size based on screen height
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
    },
    nameContainer: {
      marginBottom: height * 0.025,
    },
    rank: {
        fontSize: height * 0.02,  // Responsive font for the tag
        color: '#fff',
        textAlign: 'center',
        marginTop: height * 0.005,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#fff",
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.01,  // Dynamic vertical padding for setting items
    },
    settingText: {
        fontSize: 16,
        color: "#fff",
    },
    logoutButton: {
        backgroundColor: '#FF5A5F',
        paddingVertical: height * 0.02,  // Dynamic padding for logout button
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#23171E',
        paddingBottom: 30,  // Fixed padding for the bottom
        paddingTop: 10,  // Fixed top padding
        borderTopWidth: 1,  // Add a thin border on top
        borderTopColor: '#FFF',  // Set the border color to white
    },
    navButton: {
        padding: 10,  // Fixed padding for the nav buttons
    },
    navIcon: {
        width: 30,  // Fixed width for nav icons
        height: 30,  // Fixed height for nav icons
        resizeMode: 'contain',
    },
});



export default SettingsScreen;
