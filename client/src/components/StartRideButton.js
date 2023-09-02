import React, { useState, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../styles/styles";

const ACTION_TIMER = 300;
const COLORS = [colors.secondary, colors.primary];

const StartRideButton = ({ navigation }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const pressAction = useRef(new Animated.Value(0)).current;
  let _value = 0;
  const [card, setCard] = useState(false)

  pressAction.addListener((v) => (_value = v.value));

  const handlePressIn = () => {
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(animationActionComplete);
  };

  const handlePressOut = () => {
    Animated.timing(pressAction, {
      duration: _value * ACTION_TIMER,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const animationActionComplete = () => {
    if (_value === 1 && card) {
      console.log("Scan");
    } else {
      navigation.navigate("Payment")
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
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.button} onLayout={getButtonWidthLayout}>
          <Animated.View style={[styles.bgFill, getProgressStyles()]} />
          <Text style={styles.text}>Hold to start ride</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    overflow: "hidden"
  },
  text: {
    fontFamily: 'Roboto-Bold'
  },
  bgFill: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

// AppRegistry.registerComponent("SampleApp", () => StartRideButton);

export default StartRideButton;
