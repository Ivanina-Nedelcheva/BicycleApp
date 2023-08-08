import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/styles'

const CustomButton = ({ icon, title, color, onPress, style, magicNumber, disabled }) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                style,
                styles.button,
                {
                    backgroundColor: disabled ? colors.disabled : colors[color] || color,
                    width: windowWidth * magicNumber
                }
            ]}
            underlayColor="color"
            activeOpacity={0.8}
            disabled={disabled}
        >
            <View style={styles.wrapper}>
                {icon == 'navigation' ?
                    <Feather name={icon} size={24} color="black" /> : <AntDesign name={icon} size={24} color="black" />
                }

                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingVertical: 12,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default CustomButton;