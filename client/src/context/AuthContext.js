import React, { createContext, useState } from 'react'
import { API } from '../api/axiosConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  async function login(userData) {
    setUserToken('asdasd')
    setIsLoading(false)

    const res = await API.post('/login', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(res);
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