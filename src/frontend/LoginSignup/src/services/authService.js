import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/auth';

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Something went wrong';
  }
};

export const loginUser = async (userData) => {
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('password', userData.password);
  
      const response = await axios.post(`${BASE_URL}/login`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Login failed';
    }
  };