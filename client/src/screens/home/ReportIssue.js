import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Image, Alert, StyleSheet, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";
import { colors } from '../../../styles/styles'
import CustomButton from '../../components/CustomButton';
import { addReport } from '../../api/reports';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const ReportIssue = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [otherText, setOtherText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
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

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

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
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Roll permission is required to upload an image.');
      return;
    }

    // if (status !== 'granted') {
    //   alert('Permission to access media library required!');
    //   return;
    // }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1,
    });

    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    //   base64: true
    // })

    console.log(result.assets);
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
      console.log(imageBase64);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      Alert.alert('Please select an option to address the damage.');
      return;
    }

    if (selectedOption === 'Other' && !otherText) {
      Alert.alert('Please enter a description for "Other" option.');
      return;
    }
    // if (!imageUri) {
    //   Alert.alert('Please upload an image.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('userId', 1);
    formData.append('bikeId', 1);
    formData.append('faultText', selectedOption === 'Other' ? otherText : selectedOption);
    formData.append('imageData', imageBase64);

    addReport(formData)
    // await schedulePushNotification();
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(value) => setSelectedOption(value)}
        >
          <Picker.Item label="Select a option..." value="" style={{ color: colors.lightgrey }} />
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
            autoFocus={true}
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

          {/* <Image
            source={{ uri: `data:image/jpeg;base64, ${imageBase64}` }}
            style={{ width: 200, height: 200 }}
          /> */}
        </View>
      )}

      <CustomButton
        title="Submit"
        color={colors.primary}
        onPress={handleSubmit}
        magicNumber={0.4}
        style={styles.btn}
      />
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
