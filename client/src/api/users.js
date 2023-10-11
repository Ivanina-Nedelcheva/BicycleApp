import { API } from './axiosConfig';

const inquiryURI = 'user/inquiry'
const userHistoryURI = 'user/userHistory'
const registerUserURI = 'user/registerUser'

// export async function getUser(userId) {
//   try {
//     const response = await API.get(`/users`);
//     console.log('Response from the server:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading data:', error);
//   }
// }

export async function addUser(userData) {
  try {
    const response = await API.post(registerUserURI, userData);
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function getAllInquiries() {
  try {
    const response = await API.get(inquiryURI);
    console.log('Response from the server:', response.data);
    return response.data
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}
export async function getUserHistory(userId) {
  try {
    const response = await API.get(userHistoryURI, {
      params: {
        userId
      }
    });
    console.log('Response from the server:', response.data);
    return response.data
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}