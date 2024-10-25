import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ScoreGraphScreen = ({ navigation }) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;

    const [weeklyScores, setWeeklyScores] = useState([0, 200, 200, 380, 1080, 2380]);
    const [showGraph, setShowGraph] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showProficiency, setShowProficiency] = useState(false);

    const listData = [
        { title: 'INTJ', percentage: '95%' },
        { title: 'ENFP', percentage: '92%' },
        { title: 'ISTJ', percentage: '88%' },
        { title: 'INFP', percentage: '85%' },
        { title: 'ESTJ', percentage: '83%' },
        { title: 'ENTJ', percentage: '80%' },
        { title: 'ISFP', percentage: '76%' },
        { title: 'ESFP', percentage: '75%' },
        { title: 'ISTP', percentage: '70%' },
        { title: 'ENFJ', percentage: '67%' },
        { title: 'INFJ', percentage: '60%' },
        { title: 'ENTP', percentage: '50%' },
        { title: 'ISFJ', percentage: '45%' },
        { title: 'ESFJ', percentage: '40%' },
        { title: 'ESTP', percentage: '33%' },
        { title: 'INTP', percentage: '30%' }
    ];

    const listColors = [
        '#ff7eb3', '#ff92c1', '#ffa5cf', '#ffb8dd', '#ffcced',
        '#ffdfe8', '#ffedf3', '#fff4f7', '#ffe8e9', '#ffdadb',
        '#ffc7cd', '#ffb5bf', '#ffa2b1', '#ff8fa3', '#ff7e95',
        '#ff6e87'
    ];

    const renderCloseButton = (onPress) => (
        <TouchableOpacity
            onPress={onPress}
            style={styles.closeButtonContainer}
            activeOpacity={0.7}
        >
            <LinearGradient
                colors={['#ff758c', '#ff7eb3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.closeButton}
            >
                <Text style={styles.closeButtonText}>X</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Image buttons to open List, Graph, or Proficiency */}
            {!showGraph && !showList && !showProficiency && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => setShowList(true)}>
                        <Image source={require('../assets/icons/compatibleHeart.png')} style={styles.centerImage} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageContainer} onPress={() => setShowGraph(true)}>
                        <Image source={require('../assets/icons/graphIcon.png')} style={styles.centerImage} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageContainer} onPress={() => setShowProficiency(true)}>
                        <Image source={require('../assets/icons/thumbsIcon.png')} style={styles.centerImage} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Full-Screen Graph Overlay */}
            {showGraph && (
                <View style={styles.fullScreenOverlay}>
                    {renderCloseButton(() => setShowGraph(false))}
                    <Text style={styles.graphTitle} allowFontScaling={false}>Weekly Game Scores</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.graphContent}>
                        <LineChart
                            data={{
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                datasets: [
                                    {
                                        data: weeklyScores
                                    }
                                ]
                            }}
                            width={width * 1.2}
                            height={height * 0.35}
                            chartConfig={{
                                backgroundColor: '#23171E',
                                backgroundGradientFrom: '#ff7eb3',
                                backgroundGradientTo: '#ff7eb3',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            }}
                            style={styles.chartStyle}
                        />
                    </ScrollView>
                </View>
            )}

            {/* Scrollable List Display */}
            {showList && (
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle} allowFontScaling={false}>Compatibility</Text>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                        {listData.map((item, index) => (
                            <View key={index} style={[styles.listItem, { backgroundColor: listColors[index] }]}>
                                <Text style={styles.listItemText} allowFontScaling={false}>{item.title}</Text>
                                <Text style={styles.listItemPercentage} allowFontScaling={false}>{item.percentage}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    {renderCloseButton(() => setShowList(false))}
                </View>
            )}

            {/* Proficiency Overlay */}
            {showProficiency && (
                <View style={styles.overlayContainer}>
                    <Text style={styles.proficiencyTitle} allowFontScaling={false}>Proficiency</Text>
                    <View style={styles.proficiencyTopHalf}>
                        <Image source={require('../assets/images/Persephone.png')} style={styles.proficiencyImage} />
                        <View style={styles.transparentTextBox}>
                            <Text style={styles.nameText} allowFontScaling={false}>
                                Persephone:
                            </Text>
                            <Text style={styles.proficiencyText} allowFontScaling={false}>
                                I really enjoyed our cafe date!
                                I really enjoyed how you talked about your favorite coffees.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.proficiencyBottomHalf}>
                        <View style={styles.largerTransparentTextBox}>
                            <Text style={styles.proficiencyText} allowFontScaling={false}>
                                <Text style={styles.proficiencyTextBold}>Listener Quality: </Text>
                                INFPs, like Persephone, are natural listeners and appreciate when someone is genuinely present with them.
                            </Text>
                            <Text style={styles.proficiencyText} allowFontScaling={false}>
                                <Text style={styles.proficiencyTextBold}>Conversation Depth: </Text>
                                INFPs are drawn to meaningful discussions—anything from life goals to passions or unique insights.
                            </Text>
                        </View>
                    </View>
                    {renderCloseButton(() => setShowProficiency(false))}
                </View>
            )}

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
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    imageContainer: {
        marginBottom: height * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerImage: {
        width: width * 0.23,
        height: width * 0.23,
        resizeMode: 'contain',
    },
    fullScreenOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphContent: {
        alignItems: 'center',
        paddingTop: height * 0.2,
    },
    graphTitle: {
        fontSize: height * 0.03,
        color: '#FFFFFF',
        fontWeight: 'bold',
        position: 'absolute',
        top: height * 0.35,
    },
    chartStyle: {
        borderRadius: 10,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: height * 0.08, // Adjusted to keep it clickable
        right: width * 0.05,
        zIndex: 100, // Ensures the button is always on top
    },
    closeButton: {
        borderRadius: 20,
        width: width * 0.15,
        height: height * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.1,
    },
    listTitle: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02,
    },
    scrollViewContainer: {
        paddingBottom: height * 0.1,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        padding: width * 0.04,
        marginBottom: height * 0.01,
        borderRadius: 5,
    },
    listItemText: {
        fontSize: height * 0.02,
        color: '#23171E',
        fontWeight: 'bold',
    },
    listItemPercentage: {
        fontSize: height * 0.02,
        color: '#23171E',
        fontWeight: 'bold',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    proficiencyTitle: {
        position: 'absolute',
        top: height * 0.13, // Adjust this value to control how high the title sits
        fontSize: height * 0.03,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%', // Ensures it stays centered
    },
    proficiencyTopHalf: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    proficiencyImage: {
        width: width * 0.45,
        height: width * 0.45,
        resizeMode: 'contain',
        marginRight: width * -0.03,
    },
    transparentTextBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: height * 0.02,
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 2,
        justifyContent: 'center',
        flex: 1,
        minHeight: height * 0.2,
    },
    largerTransparentTextBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: height * 0.02,
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        width: width * 0.9,
        minHeight: height * 0.3,
    },
    nameText: {
        color: '#ff7eb3',
        fontSize: height * 0.025,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02,
    },
    proficiencyText: {
        color: '#FFF',
        fontSize: height * 0.018,
        textAlign: 'center',
        lineHeight: height * 0.03,
        paddingHorizontal: width * 0.03,
    },
    proficiencyTextBold: {
        fontWeight: 'bold',
        color: '#FFF',
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
});

export default ScoreGraphScreen;
