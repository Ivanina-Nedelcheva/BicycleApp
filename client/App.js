import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Linking, Text } from 'react-native';
import Constants from "expo-constants";
import { CardProvider } from './src/context/CardContext';
import AppNav from './src/navigation/AppNav';
import { fonts } from './styles/styles'
import { AuthProvider } from './src/context/AuthContext';
import { TimerProvider } from './src/context/TimerContext';

const App = () => {
  const [fontsLoaded] = useFonts(fonts);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CardProvider>
      <AuthProvider>
        <TimerProvider>
          <AppNav onLayout={onLayoutRootView}></AppNav>
        </TimerProvider>
      </AuthProvider>
    </CardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App