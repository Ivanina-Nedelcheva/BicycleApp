import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

const HoldToAction = () => {
  const [isPressing, setIsPressing] = useState(false);
  const scaleAnim = new Animated.Value(0);

  const handlePressIn = () => {
    setIsPressing(true);

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      // Perform your action here
      console.log('Action performed!');
      setIsPressing(false);
      scaleAnim.setValue(0);
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={() => {
          setIsPressing(false);
          scaleAnim.setValue(0);
          console.log('out');
        }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? 'darkblue' : 'blue' },
          isPressing && styles.buttonPressed,
        ]}
      >
        <Animated.View
          style={[
            styles.innerCircle,
            {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 10],
                  }),
                },
              ],
            },
          ]}
        />
        <Text style={styles.buttonText}>Hold to Action</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: 'darkblue',
  },
  innerCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    borderRadius: 50,
    opacity: 0.4,
  },
  buttonText: {
    color: 'white',
  },
});

export default HoldToAction;
