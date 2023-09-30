import axios from 'axios';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


const LAURL = "http://192.168.72.208:8080/app"
const SOFIAURL = 'http://192.168.1.102:8080/app'

export const API = axios.create({
  baseURL: LAURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = axios.create({
  baseURL: 'http://192.168.1.102:8080/app',
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
});
