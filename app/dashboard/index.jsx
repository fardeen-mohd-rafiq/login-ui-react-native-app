import { useRouter } from 'expo-router'; // Import useRouter for navigation
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const Dashboard = () => {
  const router = useRouter(); // Initialize the router
  const fadeIn = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(fadeIn.value, { damping: 2 }),
      transform: [{ scale: withSpring(scale.value, { damping: 2 }) }],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(fadeIn.value, { damping: 2 }),
      transform: [{ scale: withSpring(scale.value, { damping: 2 }) }],
    };
  });

  React.useEffect(() => {
    fadeIn.value = 1;
    scale.value = 1;
  }, []);

  const handleLogout = () => {
    // Navigate back to the login page
    router.replace('/login'); // Use replace to avoid going back to the dashboard
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.welcomeMessage}>Welcome Back</Text>
        <Text style={styles.infoMessage}>You are now logged into your dashboard.</Text>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Text style={styles.actionButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    marginBottom: 30,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoMessage: {
    fontSize: 16,
    color: Colors.darkText,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  actionButtonText: {
    color: Colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
