import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import * as geolib from 'geolib';

import { colors } from '../../styles/styles'

const NearestHubs = ({ userPosition, stations }) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { latitude, longitude } = userPosition
  const [orderedStations, setOrderedStations] = useState([])

  useEffect(() => {
    if (Object.keys(userPosition).length) {
      bottomSheetRef.current?.present();
      orderLocations()
    }
  }, [latitude])


  function orderLocations() {
    const ordered = geolib.orderByDistance(
      {
        latitude,
        longitude,
      },
      stations.map((item, index) => ({
        key: index,
        longitude: item.longitude,
        latitude: item.latitude,
      }))
    );

    function calculateTimeToStation(distance) {
      const averageSpeed = 4.5
      // Calculate time in seconds (time = distance / speed)
      return distance / averageSpeed;
    }


    // Map the ordered stations back to the original stations data
    const orderedStationsData = ordered.map(orderedStation => {
      const station = stations[orderedStation.key];
      const meters = geolib.getDistance({ latitude, longitude }, { latitude: orderedStation.latitude, longitude: orderedStation.longitude })
      const km = geolib.convertDistance(meters, 'km');
      const hours = calculateTimeToStation(km).toFixed(2)
      return { ...station, km, hours };
    });

    setOrderedStations(orderedStationsData)
    console.log(orderedStationsData);
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
  },
});

export default NearestHubs;
