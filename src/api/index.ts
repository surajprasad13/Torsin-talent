import axios from 'axios';
import store from '../redux';

const instance = axios.create({
  baseURL: 'https://torsin-admin.apponward.com/v1/api/talent/',
});

instance.interceptors.request.use(
  async config => {
    const token = store.getState().auth.userToken;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
