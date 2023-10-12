import React, { useRef, useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BikeDetails from '../../components/BikeDetails';
import { colors } from '../../../styles/styles';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { newBicycle } from '../../api/bicycles';

const Station = ({ route, navigation }) => {
  const { station } = route.params
  const [selectedBike, setSelectedBike] = useState({})
  const bottomSheetRef = useRef(null)
  console.log(station);
  const { userInfo } = useContext(AuthContext)
  const role = "ROLE_SYSTEM_ADMIN"
  const isActive = true

  const selectBike = (bike) => {
    setSelectedBike(bike)
    bottomSheetRef.current?.present();
  };

  async function handleAddBicycle() {
    const res = await newBicycle(station.id)
  }

  const bike = ({ item }) => (
    <TouchableHighlight onPress={() => selectBike(item)} underlayColor="transparent">
      <View style={styles.itemContainer}>
        <View>
          <MaterialCommunityIcons name="bike" size={24} color="black" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
          <Text style={styles.itemText}>Status: {item.state}</Text>
        </View>

        <View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.heading}>{station.stationName}</Text>

      <FlatList
        data={station.bicycles}
        renderItem={bike}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      {role !== "ROLE_SYSTEM_ADMIN" && <BikeDetails
        bike={selectedBike}
        bottomSheetRef={bottomSheetRef}
        navigation={navigation}
      />}

      {role === "ROLE_SYSTEM_ADMIN" &&
        <View style={styles.bottomBtnsWrapper}>
          <CustomButton
            // icon="plus"
            title={isActive ? "Deactivate" : "Activate"}
            color={colors.bleuDeFrance}
            magicNumber={0.4}
            onPress={handleAddBicycle}
          />
          <CustomButton
            title="Add bicycle"
            color={colors.bleuDeFrance}
            magicNumber={0.4}
            onPress={handleAddBicycle}
          />
        </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.platinum
  },
  list: {
    width: '90%',
    marginTop: 25,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
    marginTop: 24
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.seasalt,
    borderRadius: 10,
  },
  textContainer: {
    width: 120,
  },
  itemText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
  bottomBtnsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 20
  },
});

export default Station;
