import React, { useRef, useState, useCallback, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, FlatList, TouchableHighlight, ActivityIndicator, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as geolib from 'geolib';

import { colors } from '../../styles/styles'

const NearestHubs = forwardRef(({ userPosition, stations }, ref) => {
  const bottomSheetRef = useRef(null);
  const [bottomSheetPresented, setBottomSheetPresented] = useState(false);


  useImperativeHandle(ref, () => ({
    presentBottomSheet() {
      bottomSheetRef.current.present();
    }
  }));

  const snapPoints = useMemo(() => ['35%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { latitude, longitude } = userPosition
  const [orderedStations, setOrderedStations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userPosition).length && !bottomSheetPresented) {
        setBottomSheetPresented(true); // Mark bottom sheet as presented
        await orderLocations();
        bottomSheetRef.current?.present();
      }
    };

    fetchData();
  }, [userPosition.latitude, bottomSheetPresented]);


  async function orderLocations() {
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
      return { ...station, meters, km, hours };
    });

    setOrderedStations(orderedStationsData)
    console.log(orderedStationsData);
  }

  const selectHub = (hub) => {
    console.log(hub)
    // setSelectedBike(hub)
    // bottomSheetRef.current?.present();
  };

  const hub = ({ item, index }) => (
    <TouchableHighlight
      style={[styles.hub, { borderColor: index === 0 ? colors.primary : colors.lightgrey }]}
      underlayColor="transparent"
      onPress={() => selectHub(item)}
    >
      <View>
        <View>
          <Text>{item.district}</Text>
        </View>

        <View>
          <MaterialCommunityIcons name="navigation-variant-outline" size={24} color="black" />
          <MaterialCommunityIcons name="clock-check-outline" size={24} color="black" />
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.modal}
      >
        <View>
          <Text style={styles.heading}>Nearest Poho Hubs</Text>
          {/* {
            orderedStations.length ? (
              <FlatList
                data={orderedStations}
                renderItem={hub}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
              />
            ) : (
              <Text>Loading...</Text>
              )
            } */}
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color={colors.primary} />

        </View>

      </BottomSheetModal>
    </BottomSheetModalProvider >
  );
});

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 24
  },
  list: {
    marginTop: 10
  },
  hub: {
    paddingVertical: 24,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
  }
});

export default NearestHubs;
