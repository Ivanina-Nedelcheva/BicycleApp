import { API } from './axiosConfig';

const getBicyclesURI = 'bicycles/getAllBicycles'
const activateBicycleURI = 'bicycles/activateBicycle'
const deactivateBicycleURI = 'bicycles/deactivateBicycle'
const newBicycleURI = 'bicycle/newBicycle'

export async function getBicycle() {
  try {
    const response = await API.get(getBicyclesURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function activateBicycle(id) {
  try {
    const response = await API.post(activateBicycleURI, id);
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function deactivateBicycle(id) {
  try {
    const response = await API.post(deactivateBicycleURI, id);
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function newBicycle(stationId) {
  try {
    const response = await API.post(newBicycleURI, stationId);
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}