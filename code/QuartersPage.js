import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width, height } = Dimensions.get('window');


export default function QuartersPage({ handleQuarterPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isQuarterOneSelected, setIsQuarterOneSelected] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleQuarterOnePress = () => {
    setIsQuarterOneSelected(true);
    handleQuarterPress('Q1');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/Untitled (2).png')}
        style={styles.background}
        resizeMode="cover"
      >
        <StatusBar translucent={true} />
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>🌈 Choose Your Adventure! 🎠</Text>
        </Animated.View>

        <View style={styles.quartersContainer}>
          <QuarterButton title="Quarter 1" onPress={handleQuarterOnePress} />
          <QuarterButton 
            title="Quarter 2" 
            onPress={() => handleQuarterPress('Q2')} 
            disabled={!isQuarterOneSelected}
          />
          <QuarterButton 
            title="Quarter 3" 
            onPress={() => handleQuarterPress('Q3')} 
            disabled={!isQuarterOneSelected}
          />
          <QuarterButton 
            title="Quarter 4" 
            onPress={() => handleQuarterPress('Q4')} 
            disabled={!isQuarterOneSelected}
          />
        </View>
      </ImageBackground>
    </View>
  );
}


const QuarterButton = ({ title, onPress, disabled }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(bounceAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => !disabled && onPress());
  };

  return (
    <View style={styles.quarterContainer}>
      <Animated.View style={[styles.quarter, { transform: [{ scale: bounceAnim }] }]}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          style={styles.quarterTouchable}
          disabled={disabled}
        >
          <Text style={[styles.quarterText, disabled && styles.disabledQuarterText]}>{title}</Text>
        </TouchableOpacity>
      </Animated.View>
      {disabled && (
        <View style={styles.lockIconContainer}>
          <Icon name="lock-closed" size={40} color="gray" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    fontFamily: 'Comic Sans MS',
  },
  quartersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quarterContainer: {
    position: 'relative',
    margin: 15,
  },
  quarter: {
    backgroundColor: '#FFDD44',
    borderRadius: 75,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    borderWidth: 4,
    borderColor: '#FF3399',
  },
  quarterTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  quarterText: {
    fontSize: 28,
    color: '#FF3399',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  disabledQuarterText: {
    color: 'gray',
  },
  lockIconContainer: {
    position: 'absolute',
    top: '40%', 
    left: '40%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});