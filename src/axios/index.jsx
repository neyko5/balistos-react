import axios from 'axios';
import { API_INDEX } from '../settings';

axios.defaults.baseURL = API_INDEX;

axios.interceptors.request.use((config) => {
  const newConfig = config;
  if (localStorage.getItem('token')) {
    newConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return newConfig;
});

export default axios;
