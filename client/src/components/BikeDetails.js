import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'
import CustomButton from './CustomButton'
import ReservationTimer from './ReservationTimer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StartRideButton from './StartRideButton'
import { getPrices } from '../api/payment';
import { changeBicycleState } from '../api/bicycles';

const BikeDetails = ({ bike, bottomSheetRef, navigation }) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const [reservation, setReservation] = useState(false)
  const [prices, setPrices] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getPrices()
      setPrices(data)
    })()
  }, [])

  function cancelReservation() {
    setReservation(false)
    changeBicycleState(bike.id, 'FREE')
  }

  function handleReserveBike() {
    changeBicycleState(bike.id, 'RESERVED')
    setReservation(true)
  }

  function handleReportIssue() {
    console.log(bike);
    navigation.navigate('Report Issue', { id: bike.id })
  }

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
            <View style={styles.bikeAttributes}>
              <Text style={styles.attribute}>Bike ID:</Text>
              <Text style={styles.attribute}>{bike.id}</Text>
            </View>

            <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="battery" size={24} color="black" />
              <Text style={styles.attribute}>{bike.batteryLevel}%</Text>
            </View>

            <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="wallet-outline" size={24} color="black" />
              <Text style={styles.attribute}>{`${prices.unlockPrice?.toFixed(2)}lv. to start, then ${prices.minutePrice?.toFixed(2)} lv./min`} </Text>
            </View>

            {reservation && <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <ReservationTimer bikeId={bike.id} setReservation={setReservation} />
            </View>}
          </View>

          <View style={styles.btnsContainer}>
            <CustomButton
              title="Report Issue"
              icon="alert-outline"
              onPress={handleReportIssue}
              magicNumber={0.4}
              style={styles.btns}
            />

            {reservation &&
              <CustomButton
                title="Cancel"
                icon="cancel"
                onPress={cancelReservation}
                magicNumber={0.3}
                style={styles.btns}
              />
            }
          </View>

          <View style={styles.reservation}>
            <View style={styles.reservationMsg}>
              <MaterialCommunityIcons name="clock-alert-outline" size={24} color="black" />
              <Text style={styles.msg}>Reservation is free for 15min</Text>
            </View>
            <Text style={styles.subMsg}>Hold to start ride</Text>

            <View style={styles.bottomBtns}>
              {!reservation ? (
                <CustomButton
                  title="Reserve"
                  color={colors.bleuDeFrance}
                  onPress={handleReserveBike}
                  magicNumber={0.4}
                />
              ) : (
                <StartRideButton navigation={navigation} />
              )}

              {!reservation && <StartRideButton navigation={navigation} />}
            </View>
          </View>
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
