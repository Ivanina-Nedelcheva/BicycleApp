import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.102:8080/app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
