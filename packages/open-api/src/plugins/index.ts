import AxiosClient from './Axios';
import { AxiosRequestConfig, AxiosError } from 'axios';

export interface registerOptions {
  baseURL: string;
  appName?: string;
  timeout?: number;
  request: (config: AxiosRequestConfig) => AxiosRequestConfig;
  response?: (err: AxiosError) => void;
}
// 地址可以重设，拦截器也可重设，解决多请求服务问题
export function registerAxiosClient(options: registerOptions) {
  AxiosClient.instance.defaults.baseURL = options.baseURL;
  AxiosClient.instance.defaults.timeout = options.timeout;

  // 请求拦截器
  AxiosClient.instance.interceptors.request.use((config) => {
    config = Object.assign(options.request(config), config);
    return config;
  });

  // 响应拦截器
  AxiosClient.instance.interceptors.response.use(undefined, (error) => {
    options.response && options.response(error);
    return Promise.reject(error);
  });
}

export { AxiosClient };
