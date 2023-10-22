import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Linking, Text } from 'react-native';
import { CardProvider } from './src/context/CardContext';
import AppNav from './src/navigation/AppNav';
import { fonts } from './styles/styles'
import { AuthProvider } from './src/context/AuthContext';
import { RentProvider } from './src/context/RentContext';
import { ReservationProvider } from './src/context/ReservationContext';
import { ReservationTimerProvider } from './src/context/ReservationTimerContext';

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
    <ReservationTimerProvider>
      <ReservationProvider>
        <RentProvider>
          <CardProvider>
            <AuthProvider>
              <AppNav onLayout={onLayoutRootView}></AppNav>
            </AuthProvider>
          </CardProvider>
        </RentProvider>
      </ReservationProvider>
    </ReservationTimerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App