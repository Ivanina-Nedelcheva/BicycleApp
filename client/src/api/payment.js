import { API } from './axiosConfig';

const paymentURI = 'payment/getPrices'
const paymentSheetURI = 'payment/paymentSheet'

export async function getPrices() {
  try {
    const response = await API.get(paymentURI);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function getPaymentSheetParams(userId, paymentMethodId) {
  try {
    const response = await API.post(paymentSheetURI, null, {
      params: {
        userId,
        paymentMethodId
      }
    });
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}
