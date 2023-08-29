import React, { useState, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const ACTION_TIMER = 400;
const COLORS = ["rgb(255,255,255)", "rgb(111,235,62)"];

const AnimatedButtonPress = () => {
  const [textComplete, setTextComplete] = useState("");
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const pressAction = useRef(new Animated.Value(0)).current;
  let _value = 0;

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
    let message = "";
    if (_value === 1) {
      message = "You held it long enough to fire the action!";
    }
    setTextComplete(message);
  };

  const getButtonWidthLayout = (e) => {
    setButtonWidth(e.nativeEvent.layout.width - 6);
    setButtonHeight(e.nativeEvent.layout.height - 6);
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
          <Text style={styles.text}>Press And Hold Me</Text>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Text>{textComplete}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: "#111",
  },
  text: {
    backgroundColor: "transparent",
    color: "#111",
  },
  bgFill: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

AppRegistry.registerComponent("SampleApp", () => AnimatedButtonPress);

export default AnimatedButtonPress;
