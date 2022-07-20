import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://steve-blog-medium.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let Storage: any = localStorage.getItem('user');
    let store = JSON.parse(Storage);
    if (store) {
      config.headers.Authorization = 'Bearer ' + store.token;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosClient;
