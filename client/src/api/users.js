import { authAPI } from './axiosConfig';

export async function getUser(userId) {
  try {
    const response = await authAPI.get(`/users`);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

export async function addUser(userData) {
  try {
    const response = await authAPI.post(`/users/registerUser`, userData);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await authAPI.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}
export async function deleteUser(userId) {
  try {
    const response = await authAPI.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}
