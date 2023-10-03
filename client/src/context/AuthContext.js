import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import { API, authAPI } from '../api/axiosConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  function login() {
    // setIsLoading(false)
    // setUserToken('asd')

    Alert.alert('Successful Registration!', null, [{
      onPress: () => setUserToken('asd')
    }])

    // const res = await authAPI.post('/login', userData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    // console.log(res);

    // setUserInfo(res.data)
  }

  function logout() {
    setUserToken(null)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  )
}