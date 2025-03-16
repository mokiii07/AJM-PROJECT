import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';
import HomePage from './HomePage';
import QuartersPage from './QuartersPage';
import WeeksPage from './WeeksPage';
import ActivitiesPage from './ActivitiesPage';
import TeacherLogin from './TeacherLogin';
import StudentDashboard from './StudentsDashboard'; 

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleBackPress = () => {
        setCurrentPage(prev => {
            switch (prev) {
                case 'weeks':
                    setSelectedWeek(null);
                    return 'quarters'; 
                case 'activities':
                    return 'weeks'; 
                case 'sing-along':
                case 'qna':
                case 'storytelling':
                    return 'activities'; 
                case 'quarters':
                    setSelectedQuarter(null);
                    return 'home'; 
                case 'studentsDashboard':
                    handleLogout(); 
                    return 'home'; 
                case 'home':
                    return 'home'; 
                default:
                    return 'home';
            }
        });
    };

    const handleQuarterPress = (quarter) => {
        setSelectedQuarter(quarter);
        setCurrentPage('weeks');
    };

    const handleWeekPress = (week) => {
        setSelectedWeek(week);
        setCurrentPage('activities');
    };

    const handleActivityPress = (activity) => {
        setCurrentPage(activity);
    };

    const handleTeacherLoginSuccess = () => {
        setIsLoggedIn(true);
        setCurrentPage('studentsDashboard'); 
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('home'); 
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();
        });
    }, [currentPage]);

    const renderBackButton = () => {
        // Render back button based on state
        if (currentPage === 'quarters' || 
            currentPage === 'weeks' || 
            currentPage === 'activities' || 
            currentPage === 'sing-along' || 
            currentPage === 'qna' || 
            currentPage === 'storytelling') {
            return (
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {renderBackButton()}
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                {currentPage === 'home' && (
                    <HomePage
                        onLoginSuccess={handleTeacherLoginSuccess}
                        handlePlayButtonPress={() => setCurrentPage('quarters')} 
                        handleStudentScores={() => {
                            setCurrentPage('login');
                        }}
                    />
                )}
                {currentPage === 'quarters' && (
                    <QuartersPage handleQuarterPress={handleQuarterPress} />
                )}
                {currentPage === 'weeks' && (
                    <WeeksPage handleWeekPress={handleWeekPress} />
                )}
                {currentPage === 'activities' && (
                    <ActivitiesPage handleActivityPress={handleActivityPress} />
                )}
                {currentPage === 'login' && (
                    <TeacherLogin onLoginSuccess={handleTeacherLoginSuccess} />
                )}
                {currentPage === 'studentsDashboard' && isLoggedIn && (
                    <StudentDashboard handleLogout={handleLogout} />  
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 0,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#FF9800', 
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white', 
    },
});