import React, { useRef, useState, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'
import { useRent } from '../context/RentContext';
import CustomButton from './CustomButton';

const RideProgress = forwardRef((props, ref) => {
  const bottomSheetRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const timeoutId = useRef(null)
  const { rentedBikeId, setMileage, isActive, setIsActive } = useRent()

  useImperativeHandle(ref, () => ({
    presentBottomSheet() {
      bottomSheetRef.current.present();
    }
  }));

  const snapPoints = useMemo(() => ['20%'], []);

  const timerDuration = 1000
  const maxSeconds = 3600
  const averageSpeed = 15.5


  const repeatFunction = () => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  };

  const callbackFunction = () => {
    setIsActive(false);
  };

  const accuTime = (timer, max, repeatArgument, callbackArgument) => {
    var counter = 1;

    var init = (t) => {
      let timeStart = new Date().getTime();
      timeoutId.current = setTimeout(() => {
        if (counter < max) {
          let fix = (new Date().getTime() - timeStart) - timer;
          init(t - fix);
          counter++;
          repeatArgument();
        } else {
          callbackArgument();
        }
      }, t);
    };
    init(timer);
  };

  const stop = () => {
    setIsActive(false)
  };

  const start = () => {
    setIsActive(true)
  };

  const calculateMileage = () => {
    const hours = seconds / 3600;
    return (hours * averageSpeed).toFixed(2);
  };

  useEffect(() => {
    setIsActive(true)
  }, [])

  useEffect(() => {
    console.log('isActive', isActive);

    if (isActive) accuTime(timerDuration, maxSeconds, repeatFunction, callbackFunction);

    if (!isActive) {
      console.log('calc', calculateMileage());
      setMileage(calculateMileage())
      setSeconds(0);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [isActive]);


  const formatTime = () => {
    const getHours = Math.floor(seconds / 3600);
    const getMinutes = Math.floor((seconds - (getHours * 3600)) / 60);
    const getSeconds = seconds - (getHours * 3600) - (getMinutes * 60);

    const formatNumber = (number) => `0${number}`.slice(-2);

    return `${formatNumber(getHours)}:${formatNumber(getMinutes)}:${formatNumber(getSeconds)}`;
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.modal}
        backgroundStyle={{ backgroundColor: colors.seasalt, borderWidth: 1, borderColor: colors.darkFrenchGray }}
      >
        <Text style={styles.heading}>Ride in progress</Text>
        <View style={styles.details}>
          <View style={styles.rideInfo}>
            <Text style={styles.attribute}>Bike ID:</Text>
            <Text style={styles.attribute}>{rentedBikeId}</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.attribute}>Time: </Text>
            <Text style={styles.attribute}>{formatTime()}</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.attribute}>Mileage: </Text>
            <Text style={styles.attribute}>{calculateMileage()} km</Text>
          </View>

        </View>

        {/* <CustomButton
          title="Stop"
          onPress={stop}
          magicNumber={0.4}
          color='black'
        />

        <CustomButton
          title="Start"
          onPress={start}
          magicNumber={0.4}
          color='black'
        /> */}
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

export default RideProgress;
