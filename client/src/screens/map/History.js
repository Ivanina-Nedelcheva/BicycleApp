import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconList from '../../components/IconList';

const rides = [1]

const History = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {!rides.length ? (
        <View style={styles.centeredWrapper}>
          <Ionicons name="information-circle-outline" size={128} color="black" />
          <Text style={styles.heading}>No rides yet</Text>

          <Text style={styles.text}>Once you take a ride or make a purchase, you'll see it here.</Text>
        </View>
      ) : (
        <View style={styles.centeredWrapper}>
          <Image></Image>

          <Text>Rides</Text>

          <IconList></IconList>
        </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredWrapper: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // borderWidth: 1,
    marginBottom: 160
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginTop: 16
  }

});

export default History
