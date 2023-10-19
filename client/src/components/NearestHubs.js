import React, { useRef, useState, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, FlatList, TouchableHighlight, ActivityIndicator, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as geolib from 'geolib';
import { colors } from '../../styles/styles'
import { getStations } from '../api/stations';

const NearestHubs = forwardRef(({ userPosition, onSelectStation }, ref) => {
  const bottomSheetRef = useRef(null);

  useImperativeHandle(ref, () => ({
    presentBottomSheet() {
      bottomSheetRef.current.present();
    }
  }));

  const snapPoints = useMemo(() => ['55%'], []);
  const [stations, setStations] = useState([])
  const [orderedStations, setOrderedStations] = useState([])


  async function handleOpenSheet(index) {
    if (index !== -1) {
      const data = await getStations();
      setStations(data)
      await orderLocations(data)
    }
  }

  async function orderLocations(stations) {
    const ordered = geolib.orderByDistance(
      userPosition,
      stations.map((item, index) => ({
        key: index,
        longitude: item.longitude,
        latitude: item.latitude,
      }))
    );

    function calculateTimeToStation(distanceMeters) {
      const averageSpeedMps = 1.4;
      const timeSeconds = distanceMeters / averageSpeedMps;
      const timeMinutes = timeSeconds / 60;
      return timeMinutes;
    }

    const orderedStationsData = ordered.map(orderedStation => {
      const station = stations[orderedStation.key];
      const meters = geolib.getDistance(userPosition, { latitude: orderedStation.latitude, longitude: orderedStation.longitude })
      const km = geolib.convertDistance(meters, 'km').toFixed(2);
      const minutes = Math.round(calculateTimeToStation(meters))
      return { ...station, meters, km, minutes };
    });

    setOrderedStations(orderedStationsData)
  }

  const selectHub = (hub) => {
    bottomSheetRef.current?.dismiss();
    setTimeout(() => {
      onSelectStation(hub)
    }, 500);
  };

  const hub = ({ item, index }) => (
    <TouchableHighlight
      style={[styles.hub, { borderColor: index === 0 ? colors.lightGreen : colors.darkFrenchGray }]}
      underlayColor={colors.antiFlashWhite}
      onPress={() => selectHub(item)}
    >
      <View style={styles.hubContainer}>
        <View style={styles.left}>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons name="navigation-variant-outline" size={24} color="black" />
            <Text style={styles.info}>{item.km} km</Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons name="clock-check-outline" size={24} color="black" />
            <Text style={styles.info}>{item.minutes} min walk</Text>
          </View>
        </View>

        <View style={styles.right}>
          <View>
            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular' }}>{item.stationName}</Text>

            {item.bicycles.some(bike => bike.state === 'FREE') ? (
              <Text style={styles.info}>Cycle available</Text>
            ) : (
              <Text style={styles.info}>Not available bicycles</Text>
            )}
          </View>

          <View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </View>
    </TouchableHighlight >
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.modal}
        backgroundStyle={{ backgroundColor: colors.seasalt, borderWidth: 1, borderColor: colors.darkFrenchGray }}
        onChange={handleOpenSheet}
      >
        <Text style={styles.heading}>Nearest Hubs</Text>
        {
          orderedStations.length ? (
            <BottomSheetFlatList
              data={orderedStations}
              renderItem={hub}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
            />
          ) : (
            <ActivityIndicator style={styles.spinner} size={60} color={colors.bleuDeFrance} />
          )
        }
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
    fontSize: 24,
    paddingBottom: 20
  },
  list: {
    // marginTop: 50
  },
  hub: {
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  hubContainer: {
    flexDirection: 'row',
  },
  left: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    gap: 8,
    borderRightWidth: 0.2,
    borderColor: colors.disabled,
  },
  right: {
    flexDirection: 'row',
    gap: 8,
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  info: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.slateGray
  },
  spinner: {
    marginTop: 60
  },
});

export default NearestHubs;
