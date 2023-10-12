import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { API, setAuthToken } from '../api/axiosConfig'
import { addUser } from '../api/users'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [errorLoginMessage, setErrorLoginMessage] = useState('')

  function register(userData) {
    addUser(userData)
    // Alert.alert('Successful Registration!', null, [{
    //   onPress: () => setUserToken('asd')
    // }])
  }

  async function login(userData) {
    try {
      const res = await API.post('/login', userData)
      setUserToken(res.headers['jwt-token'])
      setAuthToken(res.headers['jwt-token'])
      setUserInfo(res.data)
      await AsyncStorage.setItem('userToken', res.headers['jwt-token'])
      await AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
      console.error(error)
      let errorMessage = 'An error occurred while logging in.'
      if (error.response.status === 403) {
        errorMessage = 'The username or password you entered is incorrect. Please double-check your credentials and try again.'
      }
      setErrorLoginMessage(errorMessage)
    }
  }

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
    <AuthContext.Provider value={{ register, login, logout, isLoading, userToken, userInfo, errorLoginMessage, setErrorLoginMessage }}>
      {children}
    </AuthContext.Provider>
  )
}