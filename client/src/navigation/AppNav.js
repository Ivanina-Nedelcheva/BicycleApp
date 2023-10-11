import React, { useContext } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack'
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../../styles/styles';

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext)

  if (isLoading) {
    <View style={styles.indicator}>
      <ActivityIndicator size={100} color={colors.bleuDeFrance} />
    </View>
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack></AppStack> : <AuthStack></AuthStack>}

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AppNav