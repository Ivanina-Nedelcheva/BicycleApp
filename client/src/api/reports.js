import axios from './axiosConfig';

const reportURL = 'user/reportFault'
const getReportsURL = 'user/getFaultReports'

export async function getReports() {
  try {
    const response = await axios.get(getReportsURL);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

export async function addReport(reportData) {
  try {
    const response = await axios.post(reportURL, reportData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response from the server:', response.data);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}