import axios from './axiosConfig';

const stationsURI = 'stations/getStationWithBicycles'
const activateStationURI = 'stations/activateStation'
const deactivateStationURI = 'stations/deactivateStation'

export async function getStations() {
  try {
    const response = await axios.get(stationsURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function activateStation(id) {
  try {
    const response = await axios.get(activateStationURI, id);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function deactivateStation(id) {
  try {
    const response = await axios.get(deactivateStationURI, id);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}