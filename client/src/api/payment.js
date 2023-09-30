import { API } from './axiosConfig';

const paymentURI = 'payment/getPrices'

export async function getPrices() {
  try {
    const response = await API.get(paymentURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}