import { API } from './axiosConfig';

const activateBicycleURI = 'bicycles/activateBicycle'
const deactivateBicycleURI = 'bicycles/deactivateBicycle'
const newBicycleURI = 'bicycles/newBicycle'
const changeBicycleStateURI = 'bicycles/changeState'


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
    const response = await API.post(newBicycleURI, null, {
      params: {
        stationId
      }
    });

    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }

}
export async function changeBicycleState(bikeId, newState) {
  try {
    const response = await API.post(changeBicycleStateURI, null, {
      params: {
        bikeId,
        newState
      },
    });
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}