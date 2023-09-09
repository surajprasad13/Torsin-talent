import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import {updateExpire} from '../redux/reducers/authSlice';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const instance = axios.create({
  baseURL: 'https://torsin-admin.apponward.com/v1/api/',
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const {url} = config;
  // console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  const notValid = [
    'talent/user/login',
    'verify/email',
    'verify/otp',
    'talent/individual/registration',
    'talent/business/registration',
    'talent/lostPassword/otpsent',
    'talent/lostPassword/otpverify',
    'talent/resetPassword',
    'skill/corresponding/job',
    'admin/services',
    '/feed/list',
  ];

  if (notValid.includes(url as string)) {
    return config;
  } else {
    config.headers.authorization = `Bearer ${store.getState().auth.userToken}`;
    return config;
  }
};

const onErrorResponse = async (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const {} = error;
    const {} = error.config as AxiosRequestConfig;
    const {status} = (error.response as AxiosResponse) ?? {};

    if (status === 401) {
      store.dispatch(updateExpire());
    }
  } else {
    console.log(`🚨 [API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const {} = response.config;
  const {} = response;
  //console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response;
};
instance.interceptors.request.use(onRequest, onErrorResponse);
instance.interceptors.response.use(onResponse, onErrorResponse);

export default instance;
