import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Image, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../../styles/styles';
import { getStations } from '../../api/stations';
import { getAllInquiries } from '../../api/users';


const Inquiry = () => {
  const [stations, setStations] = useState([])
  const [inquiry, setInquiry] = useState([])
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    (async () => {
      const stationsData = await getStations();
      setStations(stationsData)

      const inquiryData = await getAllInquiries()
      setInquiry(inquiryData)
      console.log(inquiry);
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(value) => setSelectedOption(value)}
        >
          <Picker.Item label="Select a station..." value="" style={{ color: colors.darkFrenchGray }} />
          {stations.map((station) => {
            return <Picker.Item label={station.stationName} value={station.stationName} key={station.stationName} />
          })}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: colors.seasalt
  },
  selectContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.keppel,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: 200,
  },
  btn: {
    marginTop: 20,
  },
  textInput: {
    height: 160,
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.keppel,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  }
})

export default Inquiry