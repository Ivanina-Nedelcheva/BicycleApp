import React, { createContext, useState } from 'react'
import { API, authAPI } from '../api/axiosConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  async function login(userData) {
    setIsLoading(false)
    setUserToken('asd')

    const res = await authAPI.post('/login', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(res);

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