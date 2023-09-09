import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RideHistory from '../../components/RideHistory';

const rides = [1]

const History = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {!rides.length ? (
        <View style={styles.informationWrapper}>
          <MaterialCommunityIcons name="information-outline" size={128} color="black" />
          <Text style={styles.heading}>No rides yet</Text>

          <Text style={styles.text}>Once you take a ride or make a purchase, you'll see it here.</Text>
        </View>
      ) : (
        <View style={styles.informationWrapper}>
          <Text style={styles.heading}>Ride History</Text>

          <RideHistory></RideHistory>
        </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  informationWrapper: {
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginTop: 16
  },
});

export default History
