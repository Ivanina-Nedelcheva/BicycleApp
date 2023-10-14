import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../../styles/styles';
import { getStations } from '../../api/stations';
import { getAllInquiries } from '../../api/users';


const Inquiry = () => {
  const [stations, setStations] = useState([])
  const [inquiry, setInquiry] = useState([])
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  const filterInquiries = () => {
    console.log(inquiry);
    if (selectedOption === '') {
      (inquiry)
    } else {
      const filtered = inquiry.filter(report => report.station.id === selectedOption);
      setFilteredInquiries(filtered)
    }
  };

  useEffect(() => {
    filterInquiries();
  }, [selectedOption, inquiry]);


  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = dateObj.getDay();
    const dayName = days[dayIndex];
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const formattedDate = `${dayName}, ${day} ${month}, ${year}`;
    return formattedDate;
  };


  useEffect(() => {
    (async () => {
      const stationsData = await getStations();
      setStations(stationsData)

      const inquiryData = await getAllInquiries()
      setInquiry(inquiryData)
      console.log(inquiryData);
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
            return <Picker.Item label={station.stationName} value={station.id} key={station.stationName} />
          })}
        </Picker>
      </View>

      <Text style={styles.text}>Rented bicycles: {filteredInquiries.length}</Text>

      <ScrollView>
        {filteredInquiries.map((report, idx) => {
          return (
            <View
              style={styles.report}
              key={idx}
            >
              <Text style={styles.date}>{formatDate(report.date)}</Text>

              <View style={styles.attribute}>
                <Text style={styles.label}>User:</Text>
                <Text style={styles.description}>{` ${report.user.firstName} ${report.user.lastName}`}</Text>
              </View>

              <View style={styles.attribute}>
                <Text style={styles.label}>Bike ID:</Text>
                <Text style={styles.description}>{report.bicycle.id}</Text>
              </View>

              <View style={styles.attribute}>
                <Text style={styles.label}>Distance:</Text>
                <Text style={styles.description}>
                  {`${report.distance}km`}
                </Text>
              </View>

              <View style={styles.attribute}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.description}>
                  {`${report.price}lv`}
                </Text>
              </View>

              <View style={styles.attribute}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.description}>
                  {`${report.minutes} minutes`}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  btn: {
    marginTop: 20,
  },
  report: {
    gap: 5,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.columbiaBlue,
    borderColor: colors.lapisLazuli,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    marginTop: 20,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  label: {
    fontFamily: 'Roboto-Bold',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
})

export default Inquiry