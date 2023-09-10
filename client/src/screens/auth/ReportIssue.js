import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Alert, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../styles/styles'
import CustomButton from '../../components/CustomButton';

const ReportIssue = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherText, setOtherText] = useState('');
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

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
      setImageModalVisible(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === 'Other' && !otherText) {
      Alert.alert('Please enter a description for "Other" option');
      return;
    }
    // You can send the selection, otherText, and imageUri to your API or perform any other necessary processing here.
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select Option...', value: null, }} onValueChange={(value) => setSelectedOption(value)}
          items={options}
        />
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

      {/* <Modal isVisible={isImageModalVisible}>
        <View>
          <Text>Selected Image:</Text>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          <TouchableOpacity onPress={() => setImageModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
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
