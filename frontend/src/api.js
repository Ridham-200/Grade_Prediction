import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/predict'; // Update this URL if deploying

export const predictGrade = async (data) => {
  try {
    console.log("Sending payload to backend:", data); // Log the payload
    const response = await axios.post(API_URL, data);
    console.log("Backend response:", response.data); // Log the backend response
    return response.data;
  } catch (error) {
    console.error("Error predicting grade:", error.response ? error.response.data : error.message);
    throw error;
  }
};