import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-assets/slider';

const StartRideSlider = ({ onStartRide }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const startRideThreshold = 100; // Adjust this value to control the start ride threshold

  const handleSliderChange = (value) => {
    setSliderValue(value);

    if (value >= startRideThreshold) {
      onStartRide(); // Call the onStartRide function when the threshold is reached
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slide to Start Ride</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2000}
        value={sliderValue}
        thumbStyle={styles.thumb} // Additional thumb style
        // onValueChange={handleSliderChange}
        thumbTintColor={sliderValue >= startRideThreshold ? 'green' : 'gray'}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 10
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  slider: {
    width: 250,
    height: 50
  },
  thumb: {
    width: 50, // Customize thumb width
    height: 50, // Customize thumb height
    borderRadius: 15, // Make the thumb circular
    backgroundColor: 'white', // Customize thumb background color
    borderWidth: 2,
    borderColor: 'green', // Customize thumb border color
  },
});

export default StartRideSlider;
