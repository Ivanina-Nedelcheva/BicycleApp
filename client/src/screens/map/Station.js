import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BikeDetails from '../../components/BikeDetails';
import RideReceipt from '../../components/RideReceipt';
import { colors } from '../../../styles/styles';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { newBicycle } from '../../api/bicycles';
import { getUserDetails, returnBicycle } from '../../api/users';
import { activateStation, deactivateStation } from '../../api/stations';

const Station = ({ route, navigation }) => {
  const { station } = route.params
  const [selectedBike, setSelectedBike] = useState({})
  const [selectedRideRecord, setSelectedRideRide] = useState([]);
  const [isRented, setIsRented] = useState(false)
  const [isActiveStation, setIsActiveStation] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const bottomSheetRef = useRef(null)

  const { userRole, userInfo } = useContext(AuthContext)

  const openRecord = (rideRecord) => {
    setSelectedRideRide(rideRecord);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsRented(false)
    Alert.alert('Bicycle returned', null, [{
      onPress: () => navigation.reset({
        index: 0,
        routes: [{ name: 'Map', params: { center: true } }],
      })
    }])
  };

  const selectBike = (bike) => {
    if (isRented) {
      setMessage("Sorry, only one bicycle rental allowed per user at a time.")
      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }
    setSelectedBike(bike)
    bottomSheetRef.current?.present();
  };

  async function handleAddBicycle() {
    const res = await newBicycle(station.id)
  }

  async function handleUserDetails() {
    const res = await getUserDetails(userInfo.id)
    if (res.rentals && res.rentals.length) {
      setIsRented(true)
    }
  }

  async function handleReturnBicycle() {
    const res = await returnBicycle(userInfo.id, station.id)
    openRecord(res)
  }
  async function toggleStationState() {
    if (isActiveStation) {
      deactivateStation(station.id)
      setIsActiveStation(false)
    } else {
      activateStation(station.id)
      setIsActiveStation(true)
    }
  }

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

  useEffect(() => {
    handleUserDetails()
  }, [])

  const bike = ({ item }) => (
    <TouchableHighlight onPress={() => selectBike(item)} underlayColor="transparent">
      <View style={styles.itemContainer}>
        <View>
          <MaterialCommunityIcons name="bike" size={24} color="black" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
          <Text style={styles.itemText}>Status: {item.state}</Text>
        </View>

        <View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.heading}>{station.stationName}</Text>

      <FlatList
        data={station.bicycles}
        renderItem={bike}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      <Text style={styles.msg}>{message}</Text>

      {userRole !== "ROLE_SYSTEM_ADMIN" && <BikeDetails
        bike={selectedBike}
        stationName={station.stationName}
        bottomSheetRef={bottomSheetRef}
        navigation={navigation}
      />}

      {userRole === "ROLE_SYSTEM_ADMIN" &&
        <View style={styles.bottomBtnsWrapper}>
          <CustomButton
            title={isActiveStation ? "Deactivate" : "Activate"}
            color={colors.bleuDeFrance}
            magicNumber={0.4}
            onPress={toggleStationState}
          />
          <CustomButton
            title="Add bicycle"
            color={colors.bleuDeFrance}
            magicNumber={0.4}
            onPress={handleAddBicycle}
          />
        </View>
      }

      {userRole == "ROLE_ORDINARY_USER" && isRented &&
        <View style={styles.bottomBtnsWrapper}>
          <CustomButton
            title="Return bicycle"
            color={colors.bleuDeFrance}
            magicNumber={0.4}
            onPress={handleReturnBicycle}
          />
        </View>
      }

      {modalVisible &&
        <RideReceipt
          rideRecord={selectedRideRecord}
          onClose={closeModal}
          formatDate={formatDate}
        />
      }
    </View>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.platinum
  },
  list: {
    width: '90%',
    marginTop: 25,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
    marginTop: 24
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.seasalt,
    borderRadius: 10,
  },
  textContainer: {
    width: 120,
  },
  itemText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
  bottomBtnsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 20
  },
  msg: {
    position: 'absolute',
    fontFamily: 'Roboto-Regular',
    bottom: 100,
    fontSize: 18,
    color: colors.red,
    // textAlign: 'auto',
    // padding: 20
  }
});

export default Station;
