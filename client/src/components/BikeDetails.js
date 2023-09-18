import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'
import CustomButton from './CustomButton'
import ReservationTimer from './ReservationTimer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StartRideButton from './StartRideButton'


const BikeDetails = ({ bike, bottomSheetRef, navigation }) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const [reservation, setReservation] = useState(false)

  function cancelReservation() {
    setReservation(false)
  }

  function handleReserveBike() {
    setReservation(true)
    handleStartRide()
  }

  function handleStartRide() {

  };

  function handleReportIssue() {
    navigation.navigate('ReportIssue')
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: 'aliceblue', borderWidth: 0.3, borderColor: colors.aliceblue2 }}
      >
        <View style={styles.bikeContent}>
          <Text style={styles.heading}>Bike Details</Text>


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
              <Text style={styles.attribute}>1.50лв. to start, then 0.20 лв./min</Text>
            </View>

            {reservation && <View style={styles.bikeAttributes}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <ReservationTimer />
            </View>}
          </View>

          <View style={styles.btnContainer}>
            {/* <CustomButton
              title="Ring"
              icon="bell-ring-outline"
              color={colors.aliceblue2}
              onPress={handleReserveBike}
              magicNumber={0.3}
              style={styles.btns}
            /> */}

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
            {reservation && <Text style={styles.subMsg}>Hold to start ride</Text>}

            {!reservation ? (
              <CustomButton
                title="Reserve"
                color={colors.primary}
                onPress={handleReserveBike}
                magicNumber={0.4}
                style={{ alignSelf: 'center', marginTop: 20 }}
              />
            ) : (
              <StartRideButton navigation={navigation} />
            )}
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
  btnContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  btns: {
    marginTop: 20,
    borderWidth: 0.3,
    backgroundColor: 'white'
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
