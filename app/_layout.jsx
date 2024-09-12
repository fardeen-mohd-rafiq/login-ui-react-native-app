import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {

  useFonts({
    'poppins':require('./../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium':require('./../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold':require('./../assets/fonts/Poppins-Bold.ttf')
  })
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown:false
      }} />
      <Stack.Screen name="login/index" options={{
        headerShown:false
      }} />
      <Stack.Screen name="register/index" options={{
        headerShown:false
      }} />
      <Stack.Screen name="dashboard/index" options={{
        headerShown:false
      }} />
    </Stack>
  );
}
