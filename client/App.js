import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Linking, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from "expo-constants";
import HomeNavigator from './src/navigation/HomeNavigator'
import { CardProvider } from './src/context/CardContext';
import { Auth } from './src/screens';


const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
  });

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
      <NavigationContainer
        onLayout={onLayoutRootView}
        fallback={<Text>Loading...</Text>}
        linking={{
          config: {
            screens: {
              Auth
            },
          },
          async getInitialURL() {
            // First, you may want to do the default deep link handling
            // Check if app was opened from a deep link
            const url = await Linking.getInitialURL();

            if (url != null) {
              return url;
            }

            // Handle URL from expo push notifications
            const response = await Notifications.getLastNotificationResponseAsync();

            return response?.notification.request.content.data.url;
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);

            // Listen to incoming links from deep linking
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

            // Listen to expo push notifications
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              const url = response.notification.request.content.data.url;

              // Any custom logic to see whether the URL needs to be handled
              //...

              // Let React Navigation handle the URL
              listener(url);
            });

            return () => {
              // Clean up the event listeners
              eventListenerSubscription.remove();
              subscription.remove();
            };
          },
        }}>

        <HomeNavigator></HomeNavigator>
      </NavigationContainer>
    </CardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App