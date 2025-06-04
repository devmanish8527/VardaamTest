import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Your Laravel backend URL
  withCredentials: true, // Needed for Sanctum or cookies
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
