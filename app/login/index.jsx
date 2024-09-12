import axios from "axios";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  View
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import * as Yup from "yup";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";
import AppTextInput from "../components/AppTextInput";
import SocialMediaLinks from "../components/SocialMediaLinks";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const LoginScreen = () => {
  const router = useRouter();

  // Shared values for advanced animations
  const titleOpacity = useSharedValue(0);
  const titleTranslation = useSharedValue(-50);
  const inputTranslation = useSharedValue(100);
  const buttonScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  // Advanced animation styles
  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(titleOpacity.value, { duration: 1000 }),
      transform: [
        {
          translateY: withTiming(titleTranslation.value, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(inputTranslation.value, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
      opacity: interpolate(inputTranslation.value, [100, 0], [0, 1]),
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(buttonScale.value) }],
      opacity: withTiming(buttonOpacity.value, { duration: 600 }),
    };
  });

  // Trigger animations on mount
  useEffect(() => {
    titleOpacity.value = 1;
    titleTranslation.value = 0;
    inputTranslation.value = 0;
    buttonScale.value = 1;
    buttonOpacity.value = 1;
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Replace with your API login call
      await axios.post('http://localhost:5000/api/users/signin', values);
      router.push('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      // Handle error (e.g., show an error message)
      Alert.alert('Login failed', 'Invalid email or password. Please try again.');
      console.error('Login failed', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        {/* Title */}
        <Animated.View style={[{ alignItems: "center" }, titleStyle]}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              fontWeight: "600",
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </Animated.View>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Animated.View style={[{ marginVertical: Spacing * 3 }, inputStyle]}>
              <AppTextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}

              <AppTextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}

              {/* Sign in button with advanced animation */}
              <Animated.View style={[{ marginVertical: Spacing * 3 }, buttonStyle]}>
                <Pressable
                  onPress={() => handleSubmit()} // Call handleSubmit function
                  style={{
                    padding: Spacing * 2,
                    backgroundColor: Colors.primary,
                    borderRadius: Spacing,
                    shadowColor: Colors.primary,
                    shadowOffset: { width: 0, height: Spacing },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.onPrimary,
                      textAlign: "center",
                      fontSize: FontSize.large,
                    }}
                  >
                    Sign in
                  </Text>
                </Pressable>
              </Animated.View>
        <Text onPress={() => router.push('/register')} style={{ textAlign: "center" }}>
          Create an Account?
        </Text>

        {/* Social media icons with bounce effect */}
        <View style={{ marginVertical: Spacing * 3 }}>
          <SocialMediaLinks />
        </View>
            </Animated.View>
          )}
        </Formik>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
