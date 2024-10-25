import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LeaderboardScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const leaderboardData = [
        { rank: 1, name: 'MINH', score: 9001, profilePicture: require('../assets/images/minh.jpg') },
        { rank: 2, name: 'SEAN', score: 5000, profilePicture: require('../assets/images/sean.jpg') },
        { rank: 3, name: 'MATHEW', score: 1234, profilePicture: require('../assets/images/Mathew.jpg') },
        { rank: 4, name: 'DANIEL', score: 999, profilePicture: require('../assets/images/daniel.jpg') },
        { rank: 5, name: 'EDISON', score: 1, profilePicture: require('../assets/images/edison.png') },
        { rank: 6, name: 'RandomUser1', score: 1, profilePicture: require('../assets/icons/userIcon.png') },
        { rank: 7, name: 'RandomUser2', score: 1, profilePicture: require('../assets/icons/userIcon.png') },
        { rank: 8, name: 'RandomUser3', score: 1, profilePicture: require('../assets/icons/userIcon.png') },
        { rank: 9, name: 'RandomUser4', score: 1, profilePicture: require('../assets/icons/userIcon.png') },


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

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    // Get the current active route
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    return (
        <View style={styles.container}>
            {/* Top 3 Display with Gradient Background */}
            <LinearGradient
                colors={['#ff758c', '#ff7eb3']}
                style={styles.topThreeContainer}
            >
                <View style={styles.topThreeRow}>
                    {/* Second place on the left */}
                    <View style={styles.secondPlaceItem}>
                        <Text style={styles.rankLabel} allowFontScaling={false}>2</Text>
                        <Image source={leaderboardData[1].profilePicture} style={styles.userIconSecondPlace} />
                        <Text style={styles.playerName} allowFontScaling={false}>{leaderboardData[1].name}</Text>
                        <Text style={styles.playerScore} allowFontScaling={false}>{leaderboardData[1].score.toString()}</Text>
                    </View>

                    {/* First place in the middle */}
                    <View style={styles.firstPlaceItem}>
                        <Text style={styles.rankLabel} allowFontScaling={false}>1</Text>
                        <Image source={leaderboardData[0].profilePicture} style={styles.userIconFirstPlace} />
                        <Text style={styles.playerName} allowFontScaling={false}>{leaderboardData[0].name}</Text>
                        <Text style={styles.playerScore} allowFontScaling={false}>{leaderboardData[0].score.toString()}</Text>
                    </View>

                    {/* Third place on the right */}
                    <View style={styles.thirdPlaceItem}>
                        <Text style={styles.rankLabel} allowFontScaling={false}>3</Text>
                        <Image source={leaderboardData[2].profilePicture} style={styles.userIconThirdPlace} />
                        <Text style={styles.playerName} allowFontScaling={false}>{leaderboardData[2].name}</Text>
                        <Text style={styles.playerScore} allowFontScaling={false}>{leaderboardData[2].score.toString()}</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Info Button */}
            <TouchableOpacity onPress={handleOpenModal} style={styles.infoButton}>
                <Image source={require('../assets/icons/infoIcon.png')} style={styles.infoIcon} />
            </TouchableOpacity>

            {/* Spacing between sections */}
            <View style={styles.spacing} />

            {/* Main Leaderboard List */}
            <ScrollView
                style={styles.scrollableLeaderboardList}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: height * 0.10 }]}  // Added more bottom padding
                showsVerticalScrollIndicator={false}  // Optional: hides scroll bar
            >
                {leaderboardData.map((player, index) => (
                    <View
                        key={index}
                        style={[styles.leaderboardItem, { backgroundColor: getBackgroundColor(player.rank) }]}
                    >
                        <View style={styles.rankAndIconContainer}>
                            <Text style={styles.rankText} allowFontScaling={false}>{player.rank.toString()}</Text>
                            <Image source={player.profilePicture} style={styles.userIconMainList} />
                        </View>
                        <View style={styles.nameAndScoreContainer}>
                            <Text style={styles.playerNameSmall} allowFontScaling={false}>{player.name}</Text>
                            <Text style={styles.playerScoreSmall} allowFontScaling={false}>{player.score.toString()}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>


            {/* Modal for Overlay */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.overlayContainer}>
                    <View style={styles.overlayContent}>
                        <Text style={styles.overlayText} allowFontScaling={false}>This weekly leaderboard tracks how well you navigate social and romantic situations, helping you improve your interpersonal skills over time.</Text>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <LinearGradient
                                colors={['#ff758c', '#ff7eb3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.closeButtonGradient} // New style for the gradient container
                            >
                                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButtonContent}>
                                    <Text style={styles.closeButtonText} allowFontScaling={false}>Close</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        backgroundColor: '#23171E',
        alignItems: 'center',
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
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: width * 0.2,
        resizeMode: 'cover',
    },
    userIconSecondPlace: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.09,
        resizeMode: 'cover',
    },
    userIconThirdPlace: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.09,
        resizeMode: 'cover',
    },
    playerName: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginTop: height * 0.01,
        color: '#FFF',
    },
    playerScore: {
        fontSize: height * 0.02,
        color: '#FFD700',
    },
    spacing: {
        height: height * 0.05,
    },
    scrollableLeaderboardList: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: height * 0.05,  // Optional padding for the bottom of the scroll area
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height * 0.07,         // Dynamically set height
        marginBottom: height * 0.02,   // Dynamically set margin
        padding: height * 0.01,        // Dynamically set padding
        borderRadius: 10,
        width: width * 0.9,            // Dynamically set width
        alignSelf: 'center',
    },
    rankAndIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIconMainList: {
        width: width * 0.09,           // Dynamically set image size
        height: width * 0.09,
        borderRadius: width * 0.06,
        resizeMode: 'cover',
    },
    nameAndScoreContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    playerNameSmall: {
        fontSize: height * 0.015,       // Dynamically set font size
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    playerScoreSmall: {
        fontSize: height * 0.015,       // Dynamically set font size
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
    activeNavButton: {
        backgroundColor: '#ff7eb3',
        borderRadius: 10,
    },
    infoButton: {
        position: 'absolute',
        top: height * 0.08,
        right: width * 0.05,
        zIndex: 10,
    },
    infoIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayContent: {
        width: '85%',
        backgroundColor: 'rgb(255,255,255)',
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        alignItems: 'center',
    },
    overlayText: {
        fontSize: height * 0.02,
        color: '#333',
        marginBottom: height * 0.03,
    },
    closeButtonGradient: {
        width: '100%',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.1,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    closeButtonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    closeButtonText: {
      fontSize: height * 0.02,
      fontWeight: 'bold',
      color: "#fff",
    },

});

export default LeaderboardScreen;

