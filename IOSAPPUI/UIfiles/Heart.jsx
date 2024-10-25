import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

// Scale factor based on the height of the iPhone 14 Pro Max (height: 932)
const scaleFactor = height / 932;

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

    // Colors from greatest to least in shades of pink/red
    const listColors = [
        '#ff7eb3', '#ff92c1', '#ffa5cf', '#ffb8dd', '#ffcced',
        '#ffdfe8', '#ffedf3', '#fff4f7', '#ffe8e9', '#ffdadb',
        '#ffc7cd', '#ffb5bf', '#ffa2b1', '#ff8fa3', '#ff7e95',
        '#ff6e87'
    ];

    return (
        <View style={styles.container}>
            {/* Image buttons to open List or Graph or Proficiency */}
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

            {/* Graph Display */}
            {showGraph && (
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitle} allowFontScaling={false}>Weekly Game Scores</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <LineChart
                            data={{
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                datasets: [
                                    {
                                        data: weeklyScores
                                    }
                                ]
                            }}
                            width={width * 1.2} // Adjusted width to remove extra space after Sunday
                            height={height * 0.35} // Made the graph slightly smaller
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
                    {/* X Icon Button for closing the graph */}
                    <TouchableOpacity style={styles.graphCloseIconContainer} onPress={() => setShowGraph(false)}>
                        <Image source={require('../assets/icons/xIcon.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Scrollable List Display */}
            {showList && (
                <View style={styles.listContainer}>
                    {/* Title and Close Icon */}
                    <Text style={styles.listTitle} allowFontScaling={false}>Compatibility</Text>
                    <TouchableOpacity style={styles.listCloseIconContainer} onPress={() => setShowList(false)}>
                        <Image source={require('../assets/icons/xIcon.png')} style={styles.closeIcon} />
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={styles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {listData.map((item, index) => (
                            <View key={index} style={[styles.listItem, { backgroundColor: listColors[index] }]}>
                                <Text style={styles.listItemText} allowFontScaling={false}>{item.title}</Text>
                                <Text style={styles.listItemPercentage} allowFontScaling={false}>{item.percentage}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Proficiency Overlay */}
            {showProficiency && (
                <View style={styles.proficiencyContainer}>
                    <TouchableOpacity style={styles.listCloseIconContainer} onPress={() => setShowProficiency(false)}>
                        <Image source={require('../assets/icons/xIcon.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.proficiencyTopHalf}>
                        <Image source={require('../assets/images/Persephone.png')} style={styles.proficiencyImage} />
                        <View style={styles.transparentTextBox}>
                            <Text style={styles.proficiencyText} allowFontScaling={false}>
                                This is the top half text for proficiency.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.proficiencyBottomHalf}>
                        <View style={styles.largerTransparentTextBox}>
                            <Text style={styles.proficiencyText} allowFontScaling={false}>
                                This is the bottom half text for proficiency.
                            </Text>
                        </View>
                    </View>
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
        paddingHorizontal: 20,
    },
    imageContainer: {
        marginBottom: 30 * scaleFactor, // Add spacing between buttons
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerImage: {
        width: 100 * scaleFactor,
        height: 100 * scaleFactor,
        resizeMode: 'contain',
    },
    graphContainer: {
        marginTop: height * 0.1,
        alignItems: 'center',
    },
    graphTitle: {
        fontSize: height * 0.03,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 20 * scaleFactor,
    },
    chartStyle: {
        borderRadius: 10 * scaleFactor,
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70 * scaleFactor, // Increased padding to lower the title and button
    },
    listTitle: {
        fontSize: 24 * scaleFactor,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20 * scaleFactor,
    },
    scrollViewContainer: {
        paddingBottom: 100 * scaleFactor, // Ensure the last item is not covered
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        padding: 15 * scaleFactor,
        marginBottom: 10 * scaleFactor,
        borderRadius: 5 * scaleFactor,
    },
    listItemText: {
        fontSize: 18 * scaleFactor,
        color: '#23171E',
        fontWeight: "bold",
    },
    listItemPercentage: {
        fontSize: 18 * scaleFactor,
        color: '#23171E', // Changed to dark text for better visibility
        fontWeight: "bold",
    },
    proficiencyContainer: {
        flex: 1,
        padding: 20 * scaleFactor,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
    },
    proficiencyTopHalf: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30 * scaleFactor,
    },
    proficiencyBottomHalf: {
        flex: 1,
        justifyContent: 'center',
    },
    proficiencyImage: {
        width: width * 0.3, // Adjusted image size to fit better
        height: width * 0.3,
        resizeMode: 'contain',
        marginTop: 50 * scaleFactor, // Lowered the Persephone image
    },
    transparentTextBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent box
        padding: 10 * scaleFactor,
        marginLeft: 10 * scaleFactor,
        borderRadius: 10 * scaleFactor,
        borderColor: '#FFF', // Added white border
        borderWidth: 2 * scaleFactor,
        justifyContent: 'center',
    },
    largerTransparentTextBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 15 * scaleFactor, // Increased padding for the bottom text box
        borderRadius: 10 * scaleFactor,
        borderColor: '#FFF',
        borderWidth: 2 * scaleFactor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proficiencyText: {
        color: '#FFF', // Text is white for better contrast
        fontSize: 14 * scaleFactor, // Adjusted font size for better fit
        fontWeight: 'bold',
    },
    graphCloseIconContainer: {
        position: 'absolute',
        top: 4 * scaleFactor, // Aligned to the top of the graph
        right: 10 * scaleFactor,
    },
    listCloseIconContainer: {
        position: 'absolute',
        top: 70 * scaleFactor, // Aligned to match the title for compatibility
        right: 10 * scaleFactor,
    },
    closeIcon: {
        width: 30 * scaleFactor,
        height: 30 * scaleFactor,
    },
    navigationBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: '#23171E',
        paddingBottom: 30 * scaleFactor,
        paddingTop: 10 * scaleFactor,
        borderTopWidth: 1 * scaleFactor,
        borderTopColor: '#FFF',
    },
    navButton: {
        padding: 10 * scaleFactor,
    },
    navIcon: {
        width: 30 * scaleFactor,
        height: 30 * scaleFactor,
        resizeMode: 'contain',
    },
    activeNavButton: {
        backgroundColor: '#ff7eb3',
        borderRadius: 10 * scaleFactor,
    },
});

export default ScoreGraphScreen;
