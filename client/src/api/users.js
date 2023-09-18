import axios from './axiosConfig';

export async function getUser(userId) {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

export async function addUser(userId, userData) {
  try {
    const response = await axios.post(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await axios.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}
export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}
