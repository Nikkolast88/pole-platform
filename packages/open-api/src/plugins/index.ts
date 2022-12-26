import type { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosInstance } from './axios';

export interface registerOptions {
  baseURL: string;
  appName?: string;
  timeout?: number;
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  response?: (err: AxiosError) => void;
}
// 地址可以重设，拦截器也可重设，解决多请求服务问题
export function registerAxiosClient(options: registerOptions) {
  axiosInstance.defaults.baseURL = options.baseURL;
  axiosInstance.defaults.timeout = options.timeout;

  // 请求拦截器
  axiosInstance.interceptors.request.use((config) => {
    if (options.request) {
      config = Object.assign(options.request(config), config);
    }
    return config;
  });

  // 响应拦截器
  axiosInstance.interceptors.response.use(undefined, (error) => {
    options.response && options.response(error);
    return Promise.reject(error);
  });
}

export * from './axios';
