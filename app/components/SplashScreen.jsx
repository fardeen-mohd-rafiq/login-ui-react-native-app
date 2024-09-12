import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors'; // Import your color palette

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const translateYAnim = useRef(new Animated.Value(20)).current; // Starts slightly off-screen

  useEffect(() => {
    // Animate the text and image
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second fade-in
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0, // Move to the center
      duration: 1000, // Same duration as fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animated.Image
        source={require('../../assets/images/welcome-img.png')} 
        style={[styles.image, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}
        resizeMode="contain"
      />
      {/* Text with Animations */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Discover Your Dream Job here
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Explore all the existing job roles based on your interest and study major
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkText,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: '80%',
  },
});