import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RideReceipt from './RideReceipt';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/styles';
import { getUserHistory } from '../api/users';
import { AuthContext } from '../context/AuthContext'

const RideHistory = () => {
  const [history, setHistory] = useState([])
  const [selectedRideRecord, setSelectedRideRide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { userInfo } = useContext(AuthContext)

  const openRecord = (rideRecord) => {
    setSelectedRideRide(rideRecord);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log(userInfo.id);
    (async () => {
      const data = await getUserHistory(userInfo.id);
      console.log(data);
      setHistory(data)
    })()
  }, [])

  const formatDate = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dayOfWeek];
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const caloriesPerKm = 50

  return (
    <ScrollView style={styles.container}>
      {history.map((rideRecord, index) => (
        <TouchableOpacity
          style={styles.rideRecord}
          key={index}
          onPress={() => openRecord(rideRecord)}
          activeOpacity={0.5}
        >
          <View style={styles.dateAndCost}>
            <Text style={styles.date}>{`${formatDate(rideRecord.date)}`}</Text>
            <Text style={styles.price}>BGN: {rideRecord.price?.toFixed(2)}lv</Text>
          </View>

          <View style={styles.statistics}>
            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{rideRecord.distance}</Text>
              <Text style={styles.label}>Distance</Text>
            </View>

            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="clock" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{rideRecord.minutes}min</Text>
              <Text style={styles.label}>Time</Text>
            </View>

            <View style={styles.wrapper}>
              <MaterialCommunityIcons name="leaf" size={24} color={colors.darkgrey} />
              <Text style={styles.text}>{rideRecord.distance * caloriesPerKm}</Text>
              <Text style={styles.label}>Calories</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {modalVisible && selectedRideRecord &&
        <RideReceipt
          rideRecord={selectedRideRecord}
          onClose={closeModal}
          formatDate={formatDate}
        />
      }
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
  price: {
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
