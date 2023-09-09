import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

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
  ];

  return (
    <View style={styles.container}>
      {trips.map((icon, index) => (
        <TouchableOpacity style={styles.ride} key={index} onPress={() => handleIconClick(icon)}>
          <View style={styles.dateAndCost}>
            <Text style={styles.date}>{`${dayName}, ${icon.date}`}</Text>
            <Text>BGN: {icon.cost}lv</Text>
          </View>

          <View style={styles.statistics}>
            <Text>Distance: {icon.distance}</Text>
            <Text>Time: {icon.time}min</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  ride: {
    width: '100%',
    borderWidth: 1,
    marginTop: 10,
    gap: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },
  dateAndCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Roboto-Regular',
    padding: 20
  },
  statistics: {
    flexDirection: 'row',
    backgroundColor: 'aliceblue',
    fontFamily: 'Roboto-Regular',
    justifyContent: 'space-between',

    padding: 20
  }

});

export default IconList;
