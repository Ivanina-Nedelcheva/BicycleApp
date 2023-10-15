import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RideHistory from '../../components/RideHistory';
import { colors } from '../../../styles/styles';
import { AuthContext } from '../../context/AuthContext';
import { getUserHistory } from '../../api/users';

const History = () => {
  const [history, setHistory] = useState([])
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const data = await getUserHistory(userInfo.id);
      setHistory(data)
    })()
  }, [])

  return (
    <View style={styles.container}>
      {!history.length ? (
        <View style={styles.informationWrapper}>
          <MaterialCommunityIcons name="information-outline" size={128} color="black" />
          <Text style={styles.heading}>No records</Text>

          <Text style={styles.text}>Once you take a ride or make a purchase, you'll see it here.</Text>
        </View>
      ) : (
        <View>
          <RideHistory history={history}></RideHistory>
        </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.seasalt
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

export default History
