import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";
import { colors } from '../../../styles/styles'
import CustomButton from '../../components/CustomButton';

// $ npm i react-native-picker-select --legacy-peer-deps 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const ReportIssue = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherText, setOtherText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got shadow notification! 🐱‍👤",
        body: 'I want to be ninja 🐱‍👤',
        data: { data: 'Im almost a ninjaaaa!' },
        // sound: 'i-want-to-be-ninja.wav'
      },
      trigger: { seconds: 1 },
    });
  }


  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const options = [
    { label: 'Flat Tire', value: 'Flat Tire' },
    { label: 'Brake Issues', value: 'Brake Issues' },
    { label: 'Gear Shifting Problems', value: 'Gear Shifting Problems' },
    { label: 'Seat Issue', value: 'Seat Issue' },
    { label: 'Chain Issues', value: 'Chain Issues' },
    { label: 'Lights or Reflectors', value: 'Lights or Reflectors' },
    { label: 'Pedal Problems', value: 'Pedal Problems' },
    { label: 'Frame Damage', value: 'Frame Damage' },
    { label: 'Other', value: 'Other' },
  ];

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Roll permission is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === 'Other' && !otherText) {
      Alert.alert('Please enter a description for "Other" option');
      return;
    }
    await schedulePushNotification();
    // You can send the selection, otherText, and imageUri to your API or perform any other necessary processing here.
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          placeholder={{ label: 'Select Option...', value: null, }}
          onValueChange={(value) => setSelectedOption(value)}
        >
          {options.map((item) => {
            return <Picker.Item label={item.label} value={item.value} key={item.value} />
          })}
        </Picker>
      </View>

      {selectedOption === 'Other' && (
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter a description"
            onChangeText={(text) => setOtherText(text)}
            multiline={true}
            maxLength={255}
            style={styles.input}
          />
        </View>

      )}

      <CustomButton
        title={imageUri ? "Upload New Image" : "Upload Image"}
        color={colors.secondary}
        onPress={handleImageUpload}
        icon="image-outline"
        magicNumber={0.6}
        style={styles.btn}
      />

      {imageUri && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      <CustomButton
        title="Submit"
        color={colors.primary}
        onPress={handleSubmit}
        magicNumber={0.4}
        style={styles.btn}
      />

      <View style={{ marginTop: 40 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  selectContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: 200,
  },
  btn: {
    marginTop: 20,
  },
  textInput: {
    height: 160,
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  }
})

export default ReportIssue;
