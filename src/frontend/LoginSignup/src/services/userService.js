import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/auth';

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch user details';
  }
};