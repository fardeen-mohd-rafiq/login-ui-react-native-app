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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

const RegisterScreen = () => {
  const router = useRouter();

  const titleOpacity = useSharedValue(0);
  const titleTranslation = useSharedValue(-50);
  const inputTranslation = useSharedValue(100);
  const buttonScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(titleOpacity.value, { duration: 1000 }),
      transform: [
        {
          translateY: withTiming(titleTranslation.value, {
            duration: 1000,
          }),
        },
      ],
    };
  });

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(inputTranslation.value) }],
      opacity: interpolate(inputTranslation.value, [100, 0], [0, 1]),
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(buttonScale.value) }],
      opacity: withTiming(buttonOpacity.value),
    };
  });

  useEffect(() => {
    titleOpacity.value = 1;
    titleTranslation.value = 0;
    inputTranslation.value = 0;
    buttonScale.value = 1;
    buttonOpacity.value = 1;
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Replace with your API signup call
      await axios.post('http://localhost:5000/api/users/signup', values);
      console.log("success");

      router.push('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.log("failure");

      Alert.alert('Signup failed', 'An error occurred during signup. Please try again.');
      console.error('Signup failed', error);
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
            Create account
          </Text>
          <Text
            style={{
              fontSize: FontSize.small,
              fontWeight: "600",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Create an account so you can explore all the existing jobs
          </Text>
        </Animated.View>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
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

              <AppTextInput
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              )}

              {/* Sign up button */}
              <Animated.View style={[buttonStyle]}>
                <Pressable
                  onPress={() => handleSubmit()} // Call handleSubmit function
                  style={{
                    padding: Spacing * 2,
                    backgroundColor: Colors.primary,
                    marginVertical: Spacing * 3,
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
                    Sign up
                  </Text>
                </Pressable>
              </Animated.View>

              <Text onPress={() => router.push('/login')} style={{ textAlign: "center" }}>
                Already Have an Account?
              </Text>

              <SocialMediaLinks />
            </Animated.View> 
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
