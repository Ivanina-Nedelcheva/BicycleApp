import React, { createContext, useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API, setAuthToken } from '../api/axiosConfig'
import { addUser } from '../api/users'
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [errorLoginMessage, setErrorLoginMessage] = useState('')
  const [userRole, setUserRole] = useState(null)

  function register(userData) {
    addUser(userData)
  }

  async function login(userData) {
    try {
      const res = await API.post('/login', userData)
      setUserToken(res.headers['jwt-token'])
      setAuthToken(res.headers['jwt-token'])
      setUserInfo(res.data)
      await AsyncStorage.setItem('userToken', res.headers['jwt-token'])
      await AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
      const decodedToken = jwtDecode(res.headers['jwt-token'])
      setUserRole(decodedToken.authorities[0])

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
    <AuthContext.Provider value={{
      register,
      login,
      logout,
      isLoading,
      userToken,
      userInfo,
      errorLoginMessage,
      setErrorLoginMessage,
      userRole
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};