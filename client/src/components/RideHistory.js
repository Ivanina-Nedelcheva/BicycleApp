import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/styles';

const IconList = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
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
  const formattedDate = `${day} ${month}`;

  const trips = [
    { date: formattedDate, distance: '2km', cost: '2.50', time: 5 },
    { date: formattedDate, distance: '1km', cost: '3.50', time: 2.5 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
    { date: formattedDate, distance: '10km', cost: '5.50', time: 25 },
  ];

  return (
    <ScrollView style={styles.container}>
      {trips.map((ride, index) => (
        <TouchableOpacity
          style={styles.ride}
          key={index}
          onPress={() => handleIconClick(ride)}
          activeOpacity={0.5}
        >
          <View style={styles.dateAndCost}>
            <Text style={styles.date}>{`${dayName}, ${ride.date}`}</Text>
            <Text style={styles.cost}>BGN: {ride.cost}lv</Text>
          </View>

          <View style={styles.statistics}>
            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{ride.distance}</Text>
              <Text style={styles.label}>Distance</Text>
            </View>

            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="clock" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{ride.time}min</Text>
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

      {/* <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>{selectedIcon?.description}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  ride: {
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

export default IconList;
