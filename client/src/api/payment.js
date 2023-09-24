import axios from './axiosConfig';

const paymentURI = 'payment/getPrices'

export async function getPrices() {
  try {
    const response = await axios.get(paymentURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}