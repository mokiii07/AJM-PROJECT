
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    ImageBackground,
} from 'react-native';

export default function HomePage({ onLoginSuccess, handlePlayButtonPress, handleStudentScores }) {
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [titleAnimation] = useState(new Animated.Value(0));
    const [buttonScale] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.timing(titleAnimation, {
            toValue: 1,
            duration: 1500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1500,
            delay: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleProceed = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => handlePlayButtonPress()); 
    };

    return (
        <ImageBackground source={require('./assets/Untitled (2).png')} style={styles.background}>
            <View style={styles.overlay} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Animated.View style={{
                        opacity: titleAnimation,
                        transform: [{
                            translateY: titleAnimation.interpolate({ inputRange: [0, 1], outputRange: [40, 0] })
                        }]
                    }}>
                        <Text style={styles.title}>Growing Minds E-Learning</Text>
                    </Animated.View>
                    <Text style={styles.subTitle}>A Fun Learning App for Day Care Center</Text>

                    <Animated.View style={{ opacity: fadeAnimation, transform: [{ scale: buttonScale }] }}>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={handleProceed}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.playButtonText}>Start Learning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.studentScoreButton}
                            onPress={handleStudentScores}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.studentScoreButtonText}>Teacher Log-in</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFD700',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 10,
        letterSpacing: 3,
    },
    subTitle: {
        fontSize: 28,
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 15,
        fontStyle: 'italic',
    },
    playButton: {
        backgroundColor: '#FF6F00',
        paddingVertical: 22,
        paddingHorizontal: 40,
        borderRadius: 50,
        elevation: 12,
        marginVertical: 12,
        width: 340,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#BF360C',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.7,
        shadowRadius: 14,
        transform: [{ scale: 1.1 }],
    },
    playButtonText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 4,
    },
    studentScoreButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 22,
        paddingHorizontal: 40,
        borderRadius: 50,
        elevation: 12,
        marginTop: 12,
        width: 340,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#1976D2',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.7,
        shadowRadius: 14,
        transform: [{ scale: 1.1 }],
    },
    studentScoreButtonText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 4,
    },
});