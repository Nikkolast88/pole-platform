import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios';
import qs from 'qs';

import {
  ContentType,
  ApiConfig,
  QueryParamsType,
  FullRequestParams,
  TBody,
} from './types';

class AxiosClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://localhost:3000',
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 9000,
      },
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  /**
   * merge params
   *
   * @private
   * @param {AxiosRequestConfig} params1
   * @param {AxiosRequestConfig} [params2]
   * @return {*}  {AxiosRequestConfig}
   * @memberof AxiosClient
   */
  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults.headers,
      ...params1,
      ...params2,
      // headers: {
      //   ...(this.instance.defaults.headers || {}),
      //   ...(params1.headers || {}),
      //   ...((params2 && params2.headers) || {}),
      // },
    };
  }

  /**
   * Object to FormData
   *
   * @private
   * @param {Record<string, unknown>} input
   * @return {*}  {FormData}
   * @memberof AxiosClient
   */
  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === 'object' && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  /**
   * params to query string
   *
   * @private
   * @param {QueryParamsType} input
   * @return {*}  {string}
   * @memberof AxiosClient
   */
  private createQueryParams(input: QueryParamsType): string {
    return qs.stringify(input);
  }

  public request = async <T = unknown>({
    secure,
    path,
    type,
    query,
    format,
    body,
    method,
    ...params
  }: FullRequestParams): Promise<TBody<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || void 0;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object' &&
      requestParams.headers
    ) {
      // requestParams.headers.common = '{ Accept: */* }';
      requestParams.headers.post = undefined;
      requestParams.headers.put = undefined;

      body = this.createFormData(body as Record<string, unknown>);
    }
    body = this.createQueryParams(body as Record<string, unknown>);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
      method: method,
    });
  };
}

export default new AxiosClient();
