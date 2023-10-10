import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { API, setAuthToken } from '../api/axiosConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  function register() {
    setIsLoading(false)
    setUserToken('asd')

    Alert.alert('Successful Registration!', null, [{
      onPress: () => setUserToken('asd')
    }])
  }

  async function login(userData) {
    setIsLoading(true)
    const res = await API.post('/login', userData)
    setUserToken(res.headers['jwt-token'])

    console.log(res.headers['jwt-token']);
    console.log(res.data);
    setAuthToken(res.headers['jwt-token'])
    AsyncStorage.setItem('userToken', res.headers['jwt-token'])
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

    const userString = `{
      "id": 1,
      "firstName": "Iva",
      "lastName": "Ned",
      "phoneNumber": "08946",
      "email": "iva@gmail.com",
      "age": "25",
      "password": "$2a$10$Wn0a4wns5BwEdt4GQcj3MujN37OiuH93rMsc0aSDKknDVq16.VJ3W",
      "username": "Iva",
      "userRole": "ORDINARY_USER",
      "stripeId": null,
      "reservations": []
    }`;

    const userObject = JSON.parse(userString);
    setUserInfo(userObject)

  }

  console.log(userInfo);

  function logout() {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('userInfo')
    setIsLoading(false)
  }

  async function isLoggedIn() {
    try {
      setIsLoading(true)
      let token = await AsyncStorage.getItem('userToken')
      let user = await AsyncStorage.getItem('userInfo')

      if (userInfo) {
        setUserToken(token)
        setUserInfo(JSON.parse(user))
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`isLogged in error ${error}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ register, login, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  )
}