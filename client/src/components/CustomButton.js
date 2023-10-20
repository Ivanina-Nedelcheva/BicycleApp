import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/styles'

const CustomButton = ({ icon, title, color, iconColor, onPress, style, magicNumber, disabled }) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.platinum : colors[color] || color,
          width: windowWidth * magicNumber
        },
        style,
      ]}
      underlayColor="color"
      activeOpacity={0.5}
      disabled={disabled}
    >
      <View style={[styles.wrapper]}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color={iconColor || 'black'} />}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 100,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'white'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});

export default CustomButton;
