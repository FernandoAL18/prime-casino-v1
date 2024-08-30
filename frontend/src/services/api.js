import axios from 'axios';

const REGISTER_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`;
const LOGIN_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
const PROFILE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/profile`;
const UPDATE_BALANCE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/update-balance`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Unknown error' };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Unknown error' };
  }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Unknown error' };
    }
};

export const updateUserBalance = async (token, balanceData) => {
    try {
        const response = await axios.post(UPDATE_BALANCE_URL, balanceData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'Unknown error' };
    }
};