import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

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
        maximumValue={200}
        value={sliderValue}
        onValueChange={handleSliderChange}
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
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  slider: {
    width: 250,
  },
});

export default StartRideSlider;
