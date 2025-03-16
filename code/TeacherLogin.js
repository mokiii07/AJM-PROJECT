import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');
const IS_DESKTOP = Platform.OS === 'windows' || Platform.OS === 'macos' || Platform.OS === 'web';

const TeacherLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [shakeAnimation] = useState(new Animated.Value(0));
    const passwordInputRef = useRef(null);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setLoginMessage('Please enter both username and password.');
            shake();
            return;
        }

        setLoading(true);
        setLoginMessage('');

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'teacher' && password === 'password') {
            setLoginMessage('Logged in successfully!');
            onLoginSuccess();
        } else {
            setLoginMessage('Invalid username or password.');
            shake();
            passwordInputRef.current.focus();
        }

        setLoading(false);
    };

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyle = {
        transform: [{ translateX: shakeAnimation }],
    };

    return (
        <ImageBackground
            source={require('./assets/Untitled (2).png')}
            style={styles.container}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.contentContainer}
            >
                <Animatable.View animation="fadeIn" duration={800} style={{ alignItems: 'center' }}>
                    <Image source={require('./assets/1.jpg')} style={styles.image} />
                    <Text style={styles.title}>Welcome!</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInLeft" duration={700} style={styles.inputContainer}>
                    <Image source={require('./assets/1.jpg')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        accessibilityLabel="Username"
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInLeft" duration={700} style={[styles.inputContainer, animatedStyle]}>
                    <Image source={require('./assets/1.jpg')} style={styles.inputIcon} />
                    <TextInput
                        ref={passwordInputRef}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        accessibilityLabel="Password"
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={1000}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Let's Play!</Text>
                        )}
                    </TouchableOpacity>
                    {loginMessage !== '' && (
                        <Animatable.Text animation={loginMessage.includes('success') ? 'bounceIn' : 'shake'} duration={1000} style={styles.loginMessage}>
                            {loginMessage}
                        </Animatable.Text>
                    )}
                </Animatable.View>

            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: IS_DESKTOP ? 40 : 20, 
    },
    contentContainer: {
        flex: 1,
        width: IS_DESKTOP ? '40%' : '100%', 
        maxWidth: 500, // Maximum width
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: IS_DESKTOP ? width * 0.2 : width * 0.3,
        height: IS_DESKTOP ? width * 0.2 : width * 0.3,
        marginBottom: IS_DESKTOP ? 10 : 15,
        borderRadius: IS_DESKTOP ? width * 0.1 : width * 0.15,
    },
    title: {
        fontSize: IS_DESKTOP ? 24 : 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: IS_DESKTOP ? 15 : 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        paddingHorizontal: IS_DESKTOP ? 12 : 15, 
        paddingVertical: 8,  // Reduced
        marginBottom: IS_DESKTOP ? 15 : 20,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        paddingVertical: 0,
    },
    button: {
        backgroundColor: '#FF9800',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        marginTop: IS_DESKTOP ? 20 : 25,
        elevation: 3,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    loginMessage: {
        fontSize: 14,
        color: '#E91E63',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default TeacherLogin;