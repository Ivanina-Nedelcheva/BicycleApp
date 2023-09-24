import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RideReceipt from './RideReceipt';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/styles';

const RideHistory = () => {
  const [selectedRideRecord, setSelectedRideRide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openRecord = (rideRecord) => {
    setSelectedRideRide(rideRecord);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const dayOfWeek = currentDate.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[dayOfWeek];
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const rideHistory = [
    { date: formattedDate, distance: '2km', cost: '2.50', time: 5 },
    { date: formattedDate, distance: '1km', cost: '3.50', time: 2.5 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
  ];

  return (
    <ScrollView style={styles.container}>
      {rideHistory.map((rideRecord, index) => (
        <TouchableOpacity
          style={styles.rideRecord}
          key={index}
          onPress={() => openRecord(rideRecord)}
          activeOpacity={0.5}
        >
          <View style={styles.dateAndCost}>
            <Text style={styles.date}>{`${dayName}, ${rideRecord.date}`}</Text>
            <Text style={styles.cost}>BGN: {rideRecord.cost}lv</Text>
          </View>

          <View style={styles.statistics}>
            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{rideRecord.distance}</Text>
              <Text style={styles.label}>Distance</Text>
            </View>

            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="clock" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{rideRecord.time}min</Text>
              <Text style={styles.label}>Time</Text>
            </View>

            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="leaf" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>714cal</Text>
              <Text style={styles.label}>Calories</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {modalVisible && selectedRideRecord && <RideReceipt rideRecord={selectedRideRecord} onClose={closeModal} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  rideRecord: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
    gap: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lapisLazuli,
    overflow: 'hidden',
  },
  dateAndCost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  cost: {
    fontFamily: 'Roboto-Bold',
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.columbiaBlue,
    fontFamily: 'Roboto-Regular',
    padding: 20,
  },
  wrapper: {
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: colors.ultraViolet,
  },
});

export default RideHistory;
