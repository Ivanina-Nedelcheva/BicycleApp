import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'
import CustomButton from '../components/CustomButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const BikeDetails = ({ bike, bottomSheetRef }) => {
  const snapPoints = useMemo(() => ['35%', '75%'], []);

  function handleRing() {

  }

  function handleReserveBike() {
    bottomSheetRef.current?.close()
  }

  function handleReportIssue() {

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
            <View style={styles.bikeAttr}>
              <Text style={styles.attrKey}>Bike ID:</Text>
              <Text style={styles.attrValue}>{bike.id}</Text>
            </View>

            <View style={styles.bikeAttr}>
              <MaterialCommunityIcons style={{ transform: [{ rotate: '90deg' }] }} name="battery-medium" size={24} color="black" />
              <Text style={styles.attrValue}>3 km range</Text>
            </View>

            <View style={styles.bikeAttr}>
              <MaterialCommunityIcons name="wallet-outline" size={24} color="black" />
              <Text style={styles.attrValue}>1.69лв. to start, then 0.33 лв./min</Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton
              title="Ring"
              icon="bell-ring-outline"
              color="white"
              onPress={handleReserveBike}
              magicNumber={0.3}
              style={styles.btns}
            />

            <CustomButton
              title="Report Issue"
              icon="alert-outline"
              color="white"
              onPress={handleReportIssue}
              magicNumber={0.4}
              style={styles.btns}
            />
          </View>

          <View style={styles.reservation}>
            <View style={styles.reservationMsg}>
              <MaterialCommunityIcons name="clock-alert-outline" size={24} color="black" />
              <Text style={styles.msg}>Reservation is free for 15min</Text>
            </View>

            <CustomButton
              title="Reserve"
              color={colors.primary}
              onPress={handleReserveBike}
              magicNumber={0.8}
              style={[styles.btns, { alignSelf: 'center' }]}
            />
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
  bikeAttr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  attrKey: {
    fontFamily: 'Roboto-Bold',
  },
  attrValue: {
    fontFamily: 'Roboto-Bold',
  },
  btnContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 20
  },
  btns: {
    marginTop: 20,
  },
  reservation: {
    marginTop: 40,
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

});

export default BikeDetails;
