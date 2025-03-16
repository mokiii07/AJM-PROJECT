import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const BACKGROUND_IMAGE = require('./assets/Untitled (2).png');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WeeksPage({ handleWeekPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [weekPressed, setWeekPressed] = useState(null);
  const [unlockedWeeks, setUnlockedWeeks] = useState([1]); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const weeks = Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`);

  const handlePress = (week) => {
    if (unlockedWeeks.includes(week)) {
      setWeekPressed(week);
      handleWeekPress(week);
      
      // Unlock the next week after pressing the current one
      if (week < 10) {
        setUnlockedWeeks((prev) => [...prev, week + 1]);
      }
    }
  };

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.container} imageStyle={styles.backgroundImage}>
      <StatusBar style="light" translucent={false} />
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Animated.Text style={[styles.title, {
          transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
          color: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#FFF', '#FFD700'],
          }),
          fontSize: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 45],
          }),
          textShadowRadius: 10,
        }]}>Choose a Week!</Animated.Text>
        <FontAwesome5 name="calendar-alt" size={32} color="#FFD700" style={styles.calendarIcon} />
      </Animated.View>
      <View style={styles.weeksContainer}>
        {weeks.map((week, index) => (
          <WeekButton
            key={index}
            title={week}
            onPress={() => handlePress(index + 1)}
            delay={index * 150}
            weekPressed={weekPressed}
            weekNumber={index + 1}
            unlocked={unlockedWeeks.includes(index + 1)} 
          />
        ))}
      </View>
    </ImageBackground>
  );
}

const WeekButton = ({ title, onPress, delay, weekPressed, weekNumber, unlocked }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.stagger(
      150,
      [
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 600,
            delay,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 600,
            delay,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]
    ).start();
  }, [delay]);

  const getBackgroundColor = () => {
    return title === weekPressed ? '#FF69B4' : '#F0E68C'; 
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.weekContainer}>
      <Animated.View
        style={[
          styles.week,
          {
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            opacity: opacityAnim,
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <TouchableOpacity
          onPress={unlocked ? onPress : null} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
          style={styles.weekTouchable}
          accessibilityLabel={title}
          accessibilityHint={`Press to select ${title}`}
        >
          <View style={styles.content}>
            <Text style={styles.weekText}>{title}!</Text>
            {getWeekIcon(weekNumber)}
          </View>
        </TouchableOpacity>
      </Animated.View>
      {!unlocked && (
        <View style={styles.lockIconContainer}>
          <FontAwesome5 name="lock" size={40} color="gray" />
        </View>
      )}
    </View>
  );
};

const getWeekIcon = (weekNumber) => {
  switch (weekNumber) {
    case 1:
      return <FontAwesome5 name="sun" size={50} color="#FFD700" style={styles.icon} />;
    case 2:
      return <FontAwesome5 name="moon" size={50} color="#ADD8E6" style={styles.icon} />;
    case 3:
      return <FontAwesome5 name="cloud-sun" size={50} color="#87CEEB" style={styles.icon} />;
    case 4:
      return <FontAwesome5 name="tree" size={50} color="#32CD32" style={styles.icon} />;
    case 5:
      return <FontAwesome5 name="heart" size={50} color="#FF69B4" style={styles.icon} />;
    case 6:
      return <FontAwesome5 name="star" size={50} color="#FFD700" style={styles.icon} />;
    case 7:
      return <FontAwesome5 name="futbol" size={50} color="#00BFFF" style={styles.icon} />;
    case 8:
      return <FontAwesome5 name="music" size={50} color="#9400D3" style={styles.icon} />;
    case 9:
      return <FontAwesome5 name="graduation-cap" size={50} color="#8B4513" style={styles.icon} />;
    case 10:
      return <FontAwesome5 name="trophy" size={50} color="#DAA520" style={styles.icon} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
    marginRight: 10,
    fontFamily: 'Comic Sans MS',
  },
  calendarIcon: {
    color: '#FFD700',
  },
  weeksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.95,
    maxWidth: 900,
    paddingBottom: 20,
  },
  weekContainer: {
    position: 'relative',
    margin: 10,
  },
  week: {
    borderRadius: 30, 
    margin: 10,
    width: 130, 
    height: 150, 
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderStyle: 'dashed', 
    borderWidth: 2,
    borderColor: '#FF69B4', 
  },
  weekTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 30,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  weekText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#E74C3C',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 5,
    fontFamily: 'Comic Sans MS',
    textAlign: 'center',
  },
  icon: {
    marginTop: 5,
  },
  lockIconContainer: {
    position: 'absolute',
    top: '40%', 
    left: '40%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
