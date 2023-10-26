import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BikeDetails from '../../components/BikeDetails';
import RideReceipt from '../../components/RideReceipt';
import { colors } from '../../../styles/styles';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { newBicycle } from '../../api/bicycles';
import { getUserDetails, returnBicycle } from '../../api/users';
import { activateStation, deactivateStation, getStation } from '../../api/stations';
import { useRent } from '../../context/RentContext';
import { useReservation } from '../../context/ReservationContext';

const Station = ({ route, navigation }) => {
  const { stationId } = route.params
  const [station, setStation] = useState(null)
  const [selectedBike, setSelectedBike] = useState({})
  const [selectedRideRecord, setSelectedRideRide] = useState([]);
  const [isActiveStation, setIsActiveStation] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null)

  const { userRole, userInfo } = useAuth()
  const { isRented, setIsRented, setRentedBikeId, setIsActive } = useRent()
  const { isReserved } = useReservation()

  const getData = async () => {
    const station = await getStation(stationId)
    setStation(station)
    setIsActiveStation(station.activeFlag)
  }

  useEffect(() => {
    getData()

    return () => {
      if (isReserved) return
      setStation(null)
      setIsActiveStation(null)
    }
  }, [stationId, isRented, isFocused])

  const openRecord = (rideRecord) => {
    setSelectedRideRide(rideRecord);
    setModalVisible(true);
  };

  const closeReceiptModal = () => {
    setModalVisible(false);
    setIsRented(false)
    Alert.alert('Bicycle returned', null, [{
      onPress: () => navigation.navigate('Map')
    }])
  };

  const selectBike = (bike) => {
    if (isRented) {
      Alert.alert("Sorry, only one bicycle rental allowed per user at a time.")
      return
    }
    if (isReserved) {
      bottomSheetRef.current?.present();
      return
    }
    setSelectedBike(bike)
    bottomSheetRef.current?.present();
  };

  async function addBicycle() {
    try {
      await newBicycle(station.id);
    } catch (error) {
      if (error.response.status === 500) {
        Alert.alert('Maximum number of bicycles reached!', 'You cannot add more bicycles at this time.');
      } else {
        Alert.alert('An error occurred while adding the bicycle!', 'Please try again later.');
      }
    }
    await getData();
  }

  function handleAddBicycle() {
    Alert.alert(
      'Add bicycle',
      'Do you want to add the bicycle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => addBicycle()
        },
      ],
      { cancelable: true }
    );
  }

  async function handleUserDetails() {
    const res = await getUserDetails(userInfo.id)
    if (res.rentals && res.rentals.length) {
      setIsRented(true)
    }
  }

  async function handleReturnBicycle() {
    const res = await returnBicycle(userInfo.id, station.id)
    setIsActive(false)
    openRecord(res)
    setRentedBikeId(null)
  }

  async function toggleStationState() {
    console.log(station.activeFlag);

    if (isActiveStation) {
      Alert.alert(
        'Deactivate',
        'Do you want to deactivate the station?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              deactivateStation(station.id)
              setIsActiveStation(false)
            }
          },
        ],
        { cancelable: true }
      );

    } else {
      Alert.alert(
        'Activate',
        'Do you want to activate the station?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              activateStation(station.id)
              setIsActiveStation(true)
            }
          },
        ],
        { cancelable: true }
      );
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

  const isFocused = useIsFocused()

  useEffect(() => {
    handleUserDetails()

    return () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.dismiss();
      }
    };
  }, [isFocused])

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
    <View style={{ flex: 1 }}>
      {station ? (
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{station.stationName}</Text>

          <FlatList
            data={station.bicycles}
            renderItem={bike}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />

          <View style={styles.bottomBtnsWrapper}>
            {userRole === "ROLE_SYSTEM_ADMIN" || userRole === "ROLE_TECH_SUPPORT_MEMBER" ? (
              <CustomButton
                icon="power"
                color={isActiveStation ? 'black' : 'white'}
                iconColor={isActiveStation ? colors.antiFlashWhite : null}
                magicNumber={0.125}
                onPress={toggleStationState}
              />
            ) : null}

            {userRole === "ROLE_SYSTEM_ADMIN" &&
              <CustomButton
                icon="plus"
                color="white"
                magicNumber={0.125}
                onPress={handleAddBicycle}
              />
            }
            {userRole == "ROLE_ORDINARY_USER" && isRented &&
              <CustomButton
                title="Return bicycle"
                color={colors.bleuDeFrance}
                magicNumber={0.4}
                onPress={handleReturnBicycle}
              />
            }
          </View>

          <BikeDetails
            bike={selectedBike}
            stationName={station.stationName}
            bottomSheetRef={bottomSheetRef}
            navigation={navigation}
          />

          {modalVisible &&
            <RideReceipt
              rideRecord={selectedRideRecord}
              onClose={closeReceiptModal}
              formatDate={formatDate}
            />
          }
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={80} color={colors.bleuDeFrance} />
        </View>
      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.platinum,
  },
  list: {
    width: '90%',
    marginTop: 25,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
    marginTop: 24,
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
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
  },
  msg: {
    position: 'absolute',
    fontFamily: 'Roboto-Regular',
    bottom: 100,
    fontSize: 18,
    color: colors.red,
    textAlign: 'center',
    width: '60%'
  }
});

export default Station;
