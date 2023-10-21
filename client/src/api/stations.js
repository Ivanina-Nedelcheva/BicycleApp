import { API } from './axiosConfig';

const stationsURI = 'stations/getStationWithBicycles'
const stationURI = 'stations/getStation'
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

export async function getStation(stationId) {
  try {
    const response = await API.get(stationURI, {
      params: {
        stationId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function addStation(stationData) {
  try {
    const response = await API.post(newStationURI, stationData);

    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function deactivateStation(stationId) {
  try {
    const response = await API.post(deactivateStationURI, null, {
      params: {
        stationId
      }
    });
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function activateStation(stationId) {
  try {
    const response = await API.post(activateStationURI, null, {
      params: {
        stationId
      }
    });
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}