import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LeaderboardScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false); // State for controlling overlay

    const leaderboardData = [
        { rank: 1, name: 'MINH', score: 9001, profilePicture: require('../assets/images/minh.jpg') },
        { rank: 2, name: 'SEAN', score: 5000, profilePicture: require('../assets/images/sean.jpg') },
        { rank: 3, name: 'MATHEW', score: 1234, profilePicture: require('../assets/icons/userIcon.png') },
        { rank: 4, name: 'DANIEL', score: 999, profilePicture: require('../assets/icons/userIcon.png') },
        { rank: 5, name: 'EDISON', score: 1, profilePicture: require('../assets/images/fernProfile.jpg') },
    ];

    const getBackgroundColor = (rank) => {
        switch (rank) {
            case 1:
                return '#FFD700'; // Gold
            case 2:
                return '#C0C0C0'; // Silver
            case 3:
                return '#CD7F32'; // Bronze
            default:
                return '#FFF';
        }
    };

    const handleOpenModal = () => {
        setModalVisible(true); // Open the overlay
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Close the overlay
    };

    return (
        <View style={styles.container}>
            {/* Top 3 Display with Gradient Background */}
            <LinearGradient
                colors={['#ff758c', '#ff7eb3']}  // Pinkish-purple gradient
                style={styles.topThreeContainer}
            >
                <Text style={styles.title}>LEADERBOARD</Text>
                <View style={styles.topThreeRow}>
                    {/* Second place on the left */}
                    <View style={styles.secondPlaceItem}>
                        <Text style={styles.rankLabel}>2</Text>
                        <Image source={leaderboardData[1].profilePicture} style={styles.userIconSecondPlace} />
                        <Text style={styles.playerName}>{leaderboardData[1].name}</Text>
                        <Text style={styles.playerScore}>{leaderboardData[1].score.toString()}</Text>
                    </View>

                    {/* First place in the middle */}
                    <View style={styles.firstPlaceItem}>
                        <Text style={styles.rankLabel}>1</Text>
                        <Image source={leaderboardData[0].profilePicture} style={styles.userIconFirstPlace} />
                        <Text style={styles.playerName}>{leaderboardData[0].name}</Text>
                        <Text style={styles.playerScore}>{leaderboardData[0].score.toString()}</Text>
                    </View>

                    {/* Third place on the right */}
                    <View style={styles.thirdPlaceItem}>
                        <Text style={styles.rankLabel}>3</Text>
                        <Image source={leaderboardData[2].profilePicture} style={styles.userIconThirdPlace} />
                        <Text style={styles.playerName}>{leaderboardData[2].name}</Text>
                        <Text style={styles.playerScore}>{leaderboardData[2].score.toString()}</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Info Button near the top right */}
            <TouchableOpacity onPress={handleOpenModal} style={styles.infoButton}>
                <Image source={require('../assets/icons/infoIcon.png')} style={styles.infoIcon} />
            </TouchableOpacity>

            {/* Add space between Top 3 and Main Leaderboard */}
            <View style={styles.spacing} />

            {/* Main Leaderboard List for ranks 1-5 (including 1, 2, 3 again) */}
            <View style={styles.leaderboardList}>
                {leaderboardData.map((player, index) => (
                    <View
                        key={index}
                        style={[styles.leaderboardItem, { backgroundColor: getBackgroundColor(player.rank) }]}
                    >
                        <View style={styles.rankAndIconContainer}>
                            <Text style={styles.rankText}>{player.rank.toString()}</Text>
                            <Image source={player.profilePicture} style={styles.userIconMainList} />
                        </View>
                        <View style={styles.nameAndScoreContainer}>
                            <Text style={styles.playerNameSmall}>{player.name}</Text>
                            <Text style={styles.playerScoreSmall}>{player.score.toString()}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Modal for Overlay */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.overlayContainer}>
                    <View style={styles.overlayContent}>
                        <Text style={styles.overlayText}>This weekly leaderboard tracks how well you navigate social and romantic situations, helping you improve your interpersonal skills over time.</Text>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation Bar */}
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/homeIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Image source={require('../assets/icons/leaderboardIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Image source={require('../assets/icons/loveIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Settings')}>
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
        alignItems: 'center',
    },
    title: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        zIndex: 1,
        marginTop: height * 0.04,
    },
    topThreeContainer: {
        width: '100%',
        height: height * 0.35,
        paddingHorizontal: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.38,
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,
    },
    topThreeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
        position: 'absolute',
        bottom: height * 0.03,
    },
    rankLabel: {
        position: 'absolute',
        top: -height * 0.06,
        fontSize: height * 0.05,
        fontWeight: 'bold',
        color: '#fff',
    },
    firstPlaceItem: {
        alignItems: 'center',
        transform: [{ translateY: -height * 0.03 }],
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 8,
    },
    secondPlaceItem: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 8,
    },
    thirdPlaceItem: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 8,
    },
    userIconFirstPlace: {
        width: width * 0.28,  // Bigger size for first place
        height: width * 0.28,
        borderRadius: width * 0.2,  // Circular profile picture
        resizeMode: 'cover',  // Zoom in to fit the container
    },
    userIconSecondPlace: {
        width: width * 0.18,  // Medium size for second place
        height: width * 0.18,
        borderRadius: width * 0.09,  // Circular profile picture
        resizeMode: 'cover',  // Zoom in to fit the container
    },
    userIconThirdPlace: {
        width: width * 0.18,  // Smaller size for third place
        height: width * 0.18,
        borderRadius: width * 0.09,  // Circular profile picture
        resizeMode: 'cover',  // Zoom in to fit the container
    },
    playerName: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginTop: height * 0.01,
        color: '#FFF',
    },
    playerScore: {
        fontSize: height * 0.02,
        color: '#FFD700',  // Color for scores
    },
    spacing: {
        height: height * 0.05,
    },
    leaderboardList: {
        width: '100%',
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height * 0.07,
        marginBottom: height * 0.02,
        padding: height * 0.01,
        borderRadius: 10,
        width: width * 0.9,
        alignSelf: 'center',
    },
    rankAndIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIconMainList: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: width * 0.06,  // Circular profile picture for main list
        resizeMode: 'cover',  // Zoom in to fit the container
    },
    nameAndScoreContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    playerNameSmall: {
        fontSize: height * 0.015,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    playerScoreSmall: {
        fontSize: height * 0.015,
        fontWeight: 'bold',
        color: '#7C1150',
        marginLeft: width * 0.03,
    },
    rankText: {
        fontSize: height * 0.015,
        fontWeight: 'bold',
        marginRight: width * 0.02,
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
    // Styles for the info button and modal
    infoButton: {
        position: 'absolute',
        top: height * 0.08,  // Adjusted to make it slightly lower
        right: width * 0.05,
        zIndex: 10,
    },
    infoIcon: {
        width: width * 0.08,  // Adjusted width for responsiveness
        height: width * 0.08,  // Adjusted height for responsiveness
        resizeMode: 'contain',
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
    },
    overlayContent: {
        width: '85%',  // Adjusted width for responsiveness
        backgroundColor: '#FFF',
        paddingVertical: height * 0.03,  // Responsive vertical padding
        paddingHorizontal: width * 0.05,  // Responsive horizontal padding
        borderRadius: 10,
        alignItems: 'center',
    },
    overlayText: {
        fontSize: height * 0.02,  // Responsive font size
        color: '#333',
        marginBottom: height * 0.03,  // Responsive margin
    },
    closeButton: {
        backgroundColor: '#FF5A5F',
        paddingVertical: height * 0.015,  // Responsive padding
        paddingHorizontal: width * 0.1,   // Responsive padding
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: height * 0.02,  // Responsive font size
    },
});

export default LeaderboardScreen;
