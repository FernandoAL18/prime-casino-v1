import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const REGISTER_URL = `${BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${BASE_URL}/api/auth/login`;
export const PROFILE_URL = `${BASE_URL}/api/user/profile`;
export const UPDATE_BALANCE_URL = `${BASE_URL}/api/user/update-balance`;

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