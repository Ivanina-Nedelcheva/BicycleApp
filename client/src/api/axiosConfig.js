import axios from 'axios';

const localIP = 'http://192.168.1.102:8080/app'

export const setAuthToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (token) {
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export const API = axios.create({
  baseURL: localIP,
  headers: {
    'Content-Type': 'application/json',
  },
});

