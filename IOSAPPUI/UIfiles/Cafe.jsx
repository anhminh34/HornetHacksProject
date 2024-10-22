import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Modal, Animated, Easing, TouchableWithoutFeedback, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

const CafeScreen = ({ navigation }) => {
    const [text, setText] = useState(''); // State to hold the input text
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const slideAnim = useRef(new Animated.Value(height)).current; // Create animated value for sliding (starts off-screen)

    // Function to show the modal with sliding animation
    const showModal = () => {
        console.log("Menu Button Pressed"); // Check if the button press is being registered
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0, // Move modal into view (translateY to 0)
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true, // Ensure native driver is used for better performance
        }).start();
    };

    // Function to hide the modal with sliding animation
    const hideModal = () => {
        Animated.timing(slideAnim, {
            toValue: height, // Slide it back off the screen
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setModalVisible(false)); // Hide modal after the animation completes
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-90}
        >
            {/* Dismiss keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../assets/images/cafeInterior.png')} // Path to your background image
                        style={styles.background} // Apply styles for full-screen background
                    >
                        {/* Character Image */}
                        <View style={styles.characterContainer}>
                            <Image
                                source={require('../assets/images/Persephone.png')}  // Character image path
                                style={styles.characterImage}  // Custom style for image positioning
                            />
                        </View>

                        {/* Button in the top-left corner to open modal */}
                        <TouchableOpacity style={styles.topLeftButton} activeOpacity={0.7} onPress={showModal}>
                            <Text style={styles.topLeftButtonText}>Menu</Text>
                        </TouchableOpacity>

                        {/* Semi-Transparent Black Box */}
                        <View style={styles.bottomBox}>
                            <Text style={styles.boxText}>Hey. What type of Coffee do you like?</Text>
                        </View>

                        {/* Input Text Area */}
                        <TextInput
                            style={styles.input} // Style for the input field
                            placeholder="Answer Her" // Placeholder text
                            placeholderTextColor="#fff" // Placeholder text color
                            value={text} // Bind the input value to state
                            onChangeText={setText} // Update the text when the user types
                        />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>

            {/* Modal for the slide-up overlay */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none" // Disable default animation, we handle it ourselves
            >
                <View style={styles.modalContainer}>
                    <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
                        <Text style={styles.modalTitle}>End Session?</Text>
                        <TouchableOpacity style={styles.choiceButton1} onPress={hideModal}>
                            <Text style={styles.choiceButtonText1}>Keep Playing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton2} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.choiceButtonText2}>Go Home</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1, // Make the image cover the entire screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        zIndex: 0, // Ensure background is the lowest layer
    },
    topLeftButton: {
        position: 'absolute',
        top: 70, // Adjust this value to move the button down
        left: 20,
        backgroundColor: '#000', // Dark brown with 80% opacity
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.8,
        zIndex: 2, // Ensure the button appears above images
    },
    topLeftButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    characterContainer: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: -(width * 1.1 / 0.55) / 2,   // Adjusted margin for centering
        width: width * 1.1 / 0.55,               // Reduced width by 1.5 times
        height: height * 0.55 / 0.55,            // Reduced height by 1.5 times
        zIndex: 1, // Ensure character is above background but below button and modal
    },
    characterImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',  // Ensure the image scales properly within its container
    },
    bottomBox: {
        position: 'absolute',
        bottom: height * 0.2, // Adjusted to give space for the input field
        width: '100%', // Full width of the screen
        height: height * 0.12, // Adjustable height for the black box
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure it's above the background but below the button and modal
    },
    boxText: {
        color: '#fff', // White text color for visibility
        fontSize: 18,
        marginHorizontal: 10,
    },
    input: {
        color: '#fff',
        position: 'absolute',
        bottom: height * 0.12, // Place it slightly above the bottom of the screen
        width: '90%', // Make it nearly full-width with some margin
        height: 40, // Height of the input box
        backgroundColor: '#000', // Black background for the input
        borderRadius: 5, // Rounded corners
        paddingHorizontal: 10, // Padding inside the input box
        fontSize: 16, // Font size for input text
        opacity: 0.8,
        zIndex: 1, // Ensure it's above the background but below the button and modal
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Position the modal content at the bottom
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent background for better visibility
        zIndex: 3, // Ensure modal is the topmost layer
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#333',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    choiceButton1: {
        backgroundColor: '#3EAC36',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    choiceButton2: {
        backgroundColor: 'transparent',   // Transparent inside
        borderWidth: 2,                   // Set the border width
        borderColor: '#FF4A4A',           // Red outline
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    choiceButtonText1: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    choiceButtonText2: {
        color: '#FF4A4A',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CafeScreen;
