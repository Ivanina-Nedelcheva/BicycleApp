import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Button, Modal, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors } from '../../styles/styles';
import CustomButton from './CustomButton';

const Scanner = ({ isOpen, onToggle }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isModalVisible = isOpen;
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [vehicleCode, setVehicleCode] = useState('');


  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Request camera permissions
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    onToggle(false); // Close the modal when a barcode is scanned
  };

  const toggleFlashlight = () => {
    setIsFlashlightOn(!isFlashlightOn);
  };

  const handleManualCodeSubmit = () => {
    // Handle the action when the user submits a manual code
    alert(`Manually inserted code: ${vehicleCode}`);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  useEffect(() => {
    if (isOpen) {
      setScanned(false);
    }
  }, [isOpen]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.topContainer}>
          {isInputVisible ? (
            <Text style={styles.heading}>Add vehicle code</Text>
          ) : (
            <Text style={styles.heading}>Scan to unlock</Text>
          )
          }
        </View>

        <View style={styles.closeBtn}>
          <CustomButton
            icon="close"
            color="white"
            magicNumber={0.125}
            onPress={() => onToggle(false)}
          />
        </View>


        {isInputVisible ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter code manually"
              value={vehicleCode}
              onChangeText={(text) => setVehicleCode(text)}
              style={styles.input}
              keyboardType="numeric"
              autoFocus={isInputVisible}
            />

            <CustomButton
              icon="keyboard-close"
              color="white"
              magicNumber={0.125}
              onPress={toggleInputVisibility}
              style={styles.keyboardBtn}
            />
          </View>) : (
          <View style={styles.actionWrapper}>
            <View style={styles.scannerContainer}>
              <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.scanner}
                autoFocus={Camera.Constants.AutoFocus.on} // Specify autofocus settings
                flashMode={isFlashlightOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
              />
            </View>
            {scanned && (
              <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            )}

            <View style={styles.buttonsContainer}>
              <CustomButton
                icon={isFlashlightOn ? 'flashlight-off' : 'flashlight'}
                color="white"
                magicNumber={0.125}
                onPress={toggleFlashlight}
              />

              <CustomButton
                icon="keyboard"
                color="white"
                magicNumber={0.125}
                onPress={toggleInputVisibility}
              />
            </View>
          </View>)
        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'hsla(0, 0%, 0%, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  scanner: {
    width: 400,
    height: 400,
  },
  heading: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
  },
  topContainer: {
    position: 'absolute',
    top: StatusBar.currentHeight * 4,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center'
  },
  keyboardBtn: {
    marginTop: 40
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: StatusBar.currentHeight * 1,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: 'white',
    maxWidth: '100%',
  },
});

export default Scanner;
