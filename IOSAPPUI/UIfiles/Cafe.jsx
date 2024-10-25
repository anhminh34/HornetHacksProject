import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Modal, Animated, Easing, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const CafeScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;
    const [output, setOutput] = useState('');
    var response;


    const showModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const hideModal = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    // function to send data back to python backend with axios
    const sendDataToBack = async () => {
        /*
        fetch('http://127.0.0.1:5000/process-input')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }*/

        try{
            console.log('Send button pressed')
            const response =  await axios.post('http://192.168.0.129:5001/process-input',{inputValue: text}) //CHANGE IT WHENEVER
            //const response = await axios.post('http://127.0.0.1:5001/process-input', {inputValue: text});
            console.log('bruh')

            setOutput(response.data)
        } catch(error) {
            console.error("Sending back error", error);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-90}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {/* Background Image */}
                    <Image
                        source={require('../assets/images/coffeeInterior.png')}
                        style={styles.backgroundImage}
                    />

                    {/* Character Image */}
                    <View style={styles.characterContainer}>
                        <Image
                            source={require('../assets/images/Persephone.png')}
                            style={styles.characterImage}
                        />
                    </View>

                    {/* Menu Button */}
                    <TouchableOpacity style={styles.topLeftButton} activeOpacity={0.7} onPress={showModal}>
                        <Text style={styles.topLeftButtonText} allowFontScaling={false}>Menu</Text>
                    </TouchableOpacity>

                    {/* Text Box */}
                    <View style={styles.bottomBox} id="responseID">
                        <Text style={styles.boxText} placeholder="What type of coffee do you like?" allowFontScaling={false}>{output} </Text>
                    </View>

                    {/* Input Field */}
                    <TextInput
                        style={styles.input}
                        placeholder="Answer Her"
                        placeholderTextColor="#fff"
                        value={text}
                        onChangeText={setText}
                    />

                    {/* Send Button */}
                    <TouchableOpacity
                        style={styles.respondButton}
                        onPress={sendDataToBack} // Added connection to backend - Daniel
                        activeOpacity={0.6}
                    >
                        <Text style={styles.respondButtonText} allowFontScaling={false}>Respond</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

            {/* Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
            >
                <View style={styles.modalContainer}>
                    <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
                        <Text style={styles.modalTitle} allowFontScaling={false}>End Session?</Text>
                        <TouchableOpacity style={styles.choiceButton1} onPress={hideModal}>
                            <Text style={styles.choiceButtonText1} allowFontScaling={false}>Keep Playing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton2} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.choiceButtonText2} allowFontScaling={false}>Go Home</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0,
    },
    topLeftButton: {
        position: 'absolute',
        top: 70, // This can be adjusted based on need
        left: 20,
        backgroundColor: '#000',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.8,
        zIndex: 2,
    },
    topLeftButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    characterContainer: {
        position: 'absolute',
        bottom: height * -0.07, // Keep the character slightly above the bottom for responsiveness
        left: '50%',
        marginLeft: -(width * 0.54), // Adjust to properly center the character
        width: width * 1.05, // Allow the character to take more width of the screen
        height: height, // Increase the height to make the character larger
        zIndex: 1,
    },
    characterImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Ensure it maintains the aspect ratio
    },
    bottomBox: {
        position: 'absolute',
        bottom: height * 0.25,
        width: '100%',
        height: height * 0.12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    boxText: {
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 10,
    },
    input: {
        color: '#fff',
        position: 'absolute',
        bottom: height * 0.18,
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 0,
        paddingHorizontal: 20,
        fontSize: 16,
        opacity: 0.8,
        zIndex: 1,
    },
    respondButton: {
        position: 'absolute',
        bottom: height * 0.10,
        width: 150,
        height: 50,
        backgroundColor: '#ff7eb3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        left: '50%',
        marginLeft: -75,
        zIndex: 1,
    },
    respondButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 3,
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
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FF4A4A',
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
