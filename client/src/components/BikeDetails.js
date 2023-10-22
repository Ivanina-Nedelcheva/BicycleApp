import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton'
import StartRideButton from './StartRideButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { changeBicycleState } from '../api/bicycles';
import { getPrices } from '../api/payment';
import { colors } from '../../styles/styles'
import * as Notifications from 'expo-notifications';
import { useAuth } from '../context/AuthContext';
import { useReservation } from '../context/ReservationContext';
import { useTimer } from '../context/ReservationTimerContext';

const BikeDetails = ({ bike, bottomSheetRef, navigation, stationName }) => {
  const { isReserved, setIsReserved, reservedBikeId, setReservedBikeId } = useReservation()
  const [prices, setPrices] = useState({})
  const { startTimer, remainingTime } = useTimer();
  const { userRole } = useAuth()

  const snapValue = userRole === "ROLE_ORDINARY_USER" ? '75%' : '40%'
  const snapPoints = useMemo(() => [snapValue], []);

  function handleReserveBike() {
    changeBicycleState(bike.id, 'RESERVED')
    setIsReserved(true);
    setReservedBikeId(bike.id)
    startTimer(15 * 60 * 1000)
  }

  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 1000 / 60);
    const remainingSeconds = Math.floor((remainingTime / 1000) % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  function cancelReservation() {
    if (!isReserved) return
    setIsReserved(false)
    setReservedBikeId(null)
    changeBicycleState(reservedBikeId, 'FREE')
  }

  function handleReportIssue() {
    navigation.navigate('Report Issue', { id: bike.id })
  }

  useEffect(() => {
    if (!isReserved) return

    if (!remainingTime) {
      cancelReservation()

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's Up!",
          body: 'Your reservation time has ended.',
        },
        trigger: null,
      });
    }
  }, [remainingTime]);

  useEffect(() => {
    (async () => {
      const data = await getPrices()
      setPrices(data)
    })()
  }, [])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.seasalt, borderWidth: 0.3, borderColor: colors.slateGray }}
      >
        <View style={styles.bikeContent}>
          <Text style={styles.heading}>Bicycle Details</Text>

          <View style={styles.details}>
            {isReserved && <View style={styles.bikeAttributes}>
              <Text style={styles.attribute}>Station: </Text>
              <Text style={styles.attribute}>{stationName}</Text>
            </View>}

            <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name={isReserved ? 'barcode-off' : 'barcode'} size={24} color="black" />

              {/* <Text style={styles.attribute}>{isReserved ? "Reserved Bicycle ID: " : "Bike ID:"}</Text> */}
              <Text style={styles.attribute}>{reservedBikeId || bike.id}</Text>
            </View>

            <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="battery" size={24} color="black" />
              <Text style={styles.attribute}>{bike.batteryLevel}%</Text>
            </View>

            {userRole === "ROLE_ORDINARY_USER" &&
              <View style={styles.bikeAttributes}>
                <MaterialCommunityIcons name="wallet-outline" size={24} color="black" />
                <Text style={styles.attribute}>{`${prices.unlockPrice?.toFixed(2)}lv. to start, then ${prices.minutePrice?.toFixed(2)} lv./min`} </Text>
              </View>
            }

            <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="state-machine" size={24} color="black" />
              <Text style={styles.attribute}>{isReserved ? 'RESERVED' : bike.state}</Text>
            </View>

            {isReserved && <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <Text style={styles.text}>Remaining time: </Text>
              <Text style={styles.attribute}>{formatTime(remainingTime)}</Text>
            </View>}
          </View>

          <View style={styles.btnsContainer}>
            {userRole !== "ROLE_SYSTEM_ADMIN" &&
              <CustomButton
                title="Report Issue"
                icon="alert-outline"
                onPress={handleReportIssue}
                magicNumber={0.4}
                style={styles.btns}
              />
            }

            {isReserved &&
              <CustomButton
                title="Cancel"
                icon="cancel"
                onPress={cancelReservation}
                magicNumber={0.3}
                style={styles.btns}
              />
            }
          </View>

          {userRole === "ROLE_ORDINARY_USER" &&
            <View style={styles.reservation}>
              <View style={styles.reservationMsg}>
                <MaterialCommunityIcons name="clock-alert-outline" size={24} color="black" />
                <Text style={styles.msg}>Reservation is free for 15min</Text>
              </View>
              <Text style={styles.subMsg}>Hold to start ride</Text>

              <View style={styles.bottomBtns}>
                {!isReserved ? (
                  <CustomButton
                    title="Reserve"
                    color={colors.bleuDeFrance}
                    onPress={handleReserveBike}
                    magicNumber={0.4}
                  />
                ) : (
                  <StartRideButton navigation={navigation} bikeId={bike.id} />
                )}

                {!isReserved &&
                  <StartRideButton
                    navigation={navigation}
                    bikeId={bike.id}
                  />
                }
              </View>
            </View>}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bikeContent: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
  },
  details: {
    minHeight: 100,
    marginTop: 10,
    gap: 5
  },
  bikeAttributes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  attribute: {
    fontFamily: 'Roboto-Bold',
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  bottomBtns: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    justifyContent: 'center'
  },
  btns: {
    marginTop: 20,
    borderWidth: 0.3,
    backgroundColor: colors.lightGreen,
  },
  reservation: {
    height: 200,
    marginTop: 20,
    padding: 20
  },
  reservationMsg: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  msg: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  subMsg: {
    fontSize: 16,
    textAlign: 'center'
  }

});

export default BikeDetails;
