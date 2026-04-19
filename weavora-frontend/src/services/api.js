import axios from 'axios';

// Create an Axios instance pointing to your backend server
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Express server port
});

// Automatically attach the JWT token to every request if it exists
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;