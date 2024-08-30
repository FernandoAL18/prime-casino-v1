import axios from 'axios';
import { REGISTER_URL, LOGIN_URL, PROFILE_URL, UPDATE_BALANCE_URL } from './config';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(REGISTER_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserBalance = async (token, balanceData) => {
  try {
    const response = await axios.post(UPDATE_BALANCE_URL, balanceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
