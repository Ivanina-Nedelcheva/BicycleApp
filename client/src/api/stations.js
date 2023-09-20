import axios from './axiosConfig';

const stationsURI = 'stations/getStationWithBicycles'

export async function getStations() {
  try {
    const response = await axios.get(stationsURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}