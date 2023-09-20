import axios from './axiosConfig';

const getReportsURI = 'user/getFaultReports'
const reportURI = 'user/reportFault'

export async function getReports() {
  try {
    const response = await axios.get(getReportsURI);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function addReport(reportData) {
  try {
    const response = await axios.post(reportURI, reportData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}