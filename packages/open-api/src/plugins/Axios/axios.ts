import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiBody, ResponseResult } from './types';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

const axiosInstance = axios.create({
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error?.message?.includes?.('timeout')) {
      console.log('timeout');
    } else {
      console.log(error);
    }
    Promise.reject(error);
  },
);

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
): Promise<ResponseResult<ResponseType>> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then((res: AxiosResponse<ApiBody<ResponseType>>) => {
        resolve({
          data: res.data.body,
          msg: res.data.msg,
        });
      })
      .catch((err) => reject(err));
  });
};
export { axiosInstance, request };
