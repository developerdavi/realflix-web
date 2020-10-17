import axios from 'axios';
import Constants from '../Utils/Constants';

const api = axios.create({
  baseURL: Constants.API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;
