import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { colors } from '../../../styles/styles';
import CardInfo from '../../components/CardInfo'
import CustomButton from '../../components/CustomButton';

const Payment = () => {
  const bottomSheetRef = useRef(null)

  function addCardInfo() {
    bottomSheetRef.current?.present();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please insert information for the payment</Text>
      <Text style={styles.text}>We will charge you after the ride</Text>

      <CustomButton
        title="Add Card"
        color={colors.secondary}
        onPress={addCardInfo}
        magicNumber={0.8}
        style={styles.btn}
      />

      <CardInfo bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
  },
  text: {
    fontSize: 16,
    marginTop: 16,
    color: colors.darkgrey
  },
  btn: {
    marginTop: 40,
    alignSelf: 'center'
  }
});

export default Payment;
