import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getReports } from '../../api/reports';
import { colors } from '../../../styles/styles';

const BikeProblemReport = ({ navigation }) => {
  const [userReports, setUserReports] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReports();
        setUserReports(data);
        console.log(data);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <ScrollView style={styles.container}>
      {userReports.map((report, idx) => {
        return (
          <View style={styles.report} key={idx}>
            <Text>Name: {report.user.firstName}</Text>
            <Text>Date: {report.date}</Text>
            <Text>BikeId: {report.bicycle.id}</Text>
            <Text>Damage: {report.faultText}</Text>
            <Image
              source={{ uri: `data:image/jpeg;base64,${report.imageData}` }}
              style={{ width: 200, height: 200 }}
            />

          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  report: {
    gap: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primary
  },
  informationWrapper: {
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginTop: 16
  },
});

export default BikeProblemReport
