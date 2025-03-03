import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: 'http://localhost:3000/api/users',
});

axiosinstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosinstance;