import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BikeDetails from '../../components/BikeDetails';

const BikeSelect = ({ route }) => {
  const { station } = route.params
  const [selectedBike, setSelectedBike] = useState({})
  const bottomSheetRef = useRef(null)

  const selectBike = (bike) => {
    setSelectedBike(bike)
    bottomSheetRef.current?.present()
  };

  const bike = ({ item }) => (
    <TouchableHighlight onPress={() => selectBike(item)} underlayColor="transparent">
      <View style={styles.itemContainer}>
        <View>
          <MaterialCommunityIcons name="bike" size={24} color="black" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
          <Text style={styles.itemText}>Status: {item.status}</Text>
          <Text style={styles.itemText}>State: {item.state}</Text>
        </View>

        <View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.heading}>Station: {station.district}</Text>

      <FlatList
        data={station.bicycles}
        renderItem={bike}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      <BikeDetails
        bike={selectedBike}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '90%',
    marginTop: 25,
  },
  heading: {
    fontSize: 24,
    marginTop: 24
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  textContainer: {
    width: 120,
  },
  itemText: {
    fontSize: 12,
  },
});

export default BikeSelect;
