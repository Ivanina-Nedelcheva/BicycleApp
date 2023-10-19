import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles/styles';
import CardInfo from '../../components/CardInfo'

const Payment = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please insert information for the payment</Text>
      <Text style={styles.text}>We will charge you after the ride</Text>
      <CardInfo navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.platinum
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
