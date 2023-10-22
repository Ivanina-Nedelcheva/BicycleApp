import React, { useRef, useState, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'
import { useReservation } from '../context/ReservationContext';

const ReservationTimer = forwardRef((props, ref) => {
  const bottomSheetRef = useRef(null);
  const { reservedBikeId } = useReservation()

  useImperativeHandle(ref, () => ({
    presentBottomSheet() {
      bottomSheetRef.current.present();
    }
  }));

  const snapPoints = useMemo(() => ['20%'], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.modal}
        backgroundStyle={{ backgroundColor: colors.seasalt, borderWidth: 1, borderColor: colors.darkFrenchGray }}
      >
        <Text style={styles.heading}>Reservation time</Text>
        <View style={styles.details}>
          <View style={styles.rideInfo}>
            <Text style={styles.attribute}>Bike ID:</Text>
            <Text style={styles.attribute}>{reservedBikeId}</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.attribute}>Time: </Text>
            <Text style={styles.attribute}>{formatTime()}</Text>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider >
  );
});

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24
  },
  details: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
    justifyContent: 'space-around',
  },
  rideInfo: {
    flexDirection: 'column',
    gap: 5
  },
  attribute: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});

export default ReservationTimer;
