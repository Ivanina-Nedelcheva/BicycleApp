import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useCard } from "../context/CardContext";
import { colors } from "../../styles/styles";
import { useRent } from "../context/RentContext";

const ACTION_TIMER = 500;
const COLORS = [colors.columbiaBlue, colors.bleuDeFrance];

const StartRideButton = ({ navigation, bikeId }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const pressAction = useRef(new Animated.Value(0)).current;
  let _value = 0;
  const { isCard } = useCard()

  const { setIsRented, setRentedBikeId } = useRent()

  pressAction.addListener((v) => (_value = v.value));

  const handlePressIn = () => {
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      if (_value === 1) {
        animationActionComplete();
      }
    });
  };

  const handlePressOut = () => {
    Animated.timing(pressAction, {
      duration: _value * ACTION_TIMER,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const animationActionComplete = () => {
    if (!isCard) {
      setRentedBikeId(bikeId)
      navigation.navigate('Payment', { rent: true })
    }
    if (_value === 1 && isCard) {
      setRentedBikeId(bikeId)
      navigation.navigate('Map', { openScanner: true })
    }
  };

  const getButtonWidthLayout = (e) => {
    setButtonWidth(e.nativeEvent.layout.width);
    setButtonHeight(e.nativeEvent.layout.height);
  };

  const getProgressStyles = () => {
    const width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth],
    });
    const bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    return {
      width: width,
      height: buttonHeight,
      backgroundColor: bgColor,
    };
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.button} onLayout={getButtonWidthLayout}>
        <Animated.View style={[styles.bgFill, getProgressStyles()]} />
        <Text style={styles.text}>Rent</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderWidth: 1,
    borderColor: colors.bleuDeFrance,
    borderRadius: 100,
    overflow: "hidden"
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16
  },
  bgFill: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default StartRideButton;
