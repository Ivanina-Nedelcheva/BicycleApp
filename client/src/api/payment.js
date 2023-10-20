import { API } from './axiosConfig';

const paymentURI = 'payment/getPrices'
const paymentSheetURI = 'payment/paymentSheet'
const chargeURI = 'payment/chargeSavedPaymentMethod'

export async function getPrices() {
  try {
    const response = await API.get(paymentURI);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function getPaymentSheetParams(userId) {
  try {
    const response = await API.post(paymentSheetURI, null, {
      params: {
        userId,
      }
    });
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

export async function charge(customerId, paymentMethodId, amount) {
  try {
    const response = await API.post(chargeURI, null, {
      params: {
        customerId,
        paymentMethodId,
        amount
      }
    });
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}
