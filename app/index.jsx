// Index.js
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './components/SplashScreen';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <SplashScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});