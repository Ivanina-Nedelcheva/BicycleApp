import { API } from './axiosConfig';

const stationsURI = 'stations/getStationWithBicycles'
const activateStationURI = 'stations/activateStation'
const deactivateStationURI = 'stations/deactivateStation'
const newStationURI = 'stations/newStation'

export async function getStations() {
  try {
    const response = await API.get(stationsURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function addStation(stationData) {
  try {
    const response = await API.post(newStationURI, null, {
      params: {
        latitude: stationData.latitude,
        longitude: stationData.longitude,
        name: stationData.name
      },
    });

    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}