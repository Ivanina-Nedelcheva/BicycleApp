import { API } from './axiosConfig';

const paymentURI = 'payment/getPrices'
const chargeURI = 'payment/charge'

export async function getPrices() {
  try {
    const response = await API.get(paymentURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function charge() {
  try {
    const response = await API.get(chargeURI, null, {
      headers: {
        token: token.id,
        amount: 500,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}
