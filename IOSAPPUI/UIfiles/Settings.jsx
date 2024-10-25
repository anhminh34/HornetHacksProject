import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageContext } from './ImageContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showManageAccount, setShowManageAccount] = useState(false);
    const [profileName, setProfileName] = useState("Username");
    const [newProfileName, setNewProfileName] = useState(profileName);

    const {
        selectedBannerImage,
        setSelectedBannerImage,
        selectedProfileImage,
        setSelectedProfileImage
    } = useContext(ImageContext);

    const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

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
            setSelectedBannerImage(result.assets[0].uri);
        }
    };

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
            setSelectedProfileImage(result.assets[0].uri);
        }
    };

    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    const saveProfileUpdates = () => {
        setProfileName(newProfileName);
        setShowManageAccount(false);
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
                    <TouchableOpacity onPress={pickProfileImage} style={styles.profilePictureWrapper}>
                        <Image
                            source={selectedProfileImage ? { uri: selectedProfileImage } : require('../assets/icons/userIcon.png')}
                            style={styles.profilePicture}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* Settings UI */}
            <View style={styles.settingsContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.profileName} allowFontScaling={false}>{profileName}</Text>
                    <Text style={styles.fixedNumber} allowFontScaling={false}>2380</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle} allowFontScaling={false}>App Settings</Text>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText} allowFontScaling={false}>Notifications</Text>
                        <Switch
                            onValueChange={toggleNotifications}
                            value={notificationsEnabled}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle} allowFontScaling={false}>Account</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText} allowFontScaling={false}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setShowManageAccount(true)}>
                        <Text style={styles.settingText} allowFontScaling={false}>Manage Account</Text>
                    </TouchableOpacity>
                </View>

                {/* About Us Button */}
                <TouchableOpacity style={styles.settingItem} onPress={() => setShowAboutUs(true)}>
                    <Text style={styles.settingText} allowFontScaling={false}>About Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText} allowFontScaling={false}>Log Out</Text>
                </TouchableOpacity>
            </View>

            {/* Manage Account Overlay */}
            {showManageAccount && (
                <View style={styles.overlayContainer}>
                    <Text style={styles.overlayTitle}>Change Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new profile name"
                        value={newProfileName}
                        onChangeText={setNewProfileName}
                    />
                    <View style={styles.overlayButtons}>
                        <TouchableOpacity onPress={() => setShowManageAccount(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <LinearGradient
                            colors={['#ff758c', '#ff7eb3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientButton}
                        >
                            <TouchableOpacity onPress={saveProfileUpdates} style={styles.saveButtonContent}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            )}

            {/* About Us Overlay */}
            {showAboutUs && (
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={styles.closeIconContainer}
                        onPress={() => setShowAboutUs(false)}>
                        <Image source={require('../assets/icons/xIcon.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <Text style={styles.aboutTitle}>About Us - C0DE2AH</Text>
                    <Text style={styles.aboutDescription}>Edison Ho - UI Connoisseur (3 AM Pusher)</Text>
                    <Text style={styles.aboutDescription}>Sean Bombay - AI Handler (Loves Persephone)</Text>
                    <Text style={styles.aboutDescription}>Minh Nguyen - The Everything Bagel</Text>
                    <Text style={styles.aboutDescription}>Mathew Anselmi - Transformer (Optimus Prime) Researcher</Text>
                    <Text style={styles.aboutDescription}>Daniel Ming - Backend Struggler</Text>
                    <Image source={require('../assets/images/group.jpg')} style={styles.aboutImage} />
                </View>
            )}

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23171E',
    },
    banner: {
        width: '100%',
        height: height * 0.3,
        position: 'relative',
        backgroundColor: '#ddd',
        marginBottom: height * -0.03,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profilePictureWrapper: {
        position: 'absolute',
        left: '5%',
        bottom: -height * 0.05,
        width: width * 0.22,
        height: width * 0.22,
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: width * 0.11,
        borderWidth: 3,
        borderColor: '#23171E',
    },
    settingsContainer: {
        marginTop: height * 0.07, // Adjusted to bring Username and fixed number higher
        paddingHorizontal: '5%',
    },
    nameContainer: {
        marginBottom: height * 0.02,
        alignItems: 'center',
    },
    profileName: {
        fontSize: height * 0.025,
        fontWeight: 'bold',
        color: '#fff',
    },
    fixedNumber: {
        fontSize: height * 0.02,
        color: '#FFD700',
    },
    section: {
        marginBottom: height * 0.03,
    },
    sectionTitle: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: height * 0.01,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.01,
    },
    settingText: {
        fontSize: height * 0.02,
        color: "#fff",
    },
    logoutButton: {
        backgroundColor: '#FF5A5F',
        paddingVertical: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        width: '100%',
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

    // Overlay styles
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeIconContainer: {
        position: 'absolute',
        top: height * 0.08,
        right: width * 0.08,
    },
    closeIcon: {
        width: height * 0.035,
        height: height * 0.035,
        resizeMode: 'contain',
    },
    overlayTitle: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: height * 0.02,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: height * 0.02,
        width: '80%',
        borderRadius: 10,
        fontSize: height * 0.02,
        marginBottom: height * 0.02,
    },
    overlayButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    cancelButton: {
        borderColor: '#FF5A5F',
        borderWidth: 2,
        paddingVertical: height * 0.015,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'transparent',
    },
    cancelButtonText: {
        color: '#FF5A5F',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },

    // Gradient and Save Button
    gradientButton: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    saveButtonContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.015,
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },

    // About Us styles
    aboutTitle: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: height * 0.02,
    },
    aboutDescription: {
        fontSize: height * 0.02,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03,
    },
    aboutImage: {
        width: width * 0.6,
        height: width * 0.4,
        resizeMode: 'contain',
        marginBottom: height * 0.03,
    },
});

export default SettingsScreen;
