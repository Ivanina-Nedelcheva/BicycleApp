import axios from 'axios';

const LAURL = "http://192.168.191.208:8080/app"
const SOFIAURL = 'http://192.168.1.102:8080/app'

export const setAuthToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // if (token) {
  // } else {
  //   delete API.defaults.headers.common['Authorization'];
  // }
};

export const API = axios.create({
  baseURL: SOFIAURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

