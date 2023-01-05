import { AxiosRequestConfig, ResponseType, AxiosResponse } from 'axios';
export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}
export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export type QueryParamsType = Record<string | number, unknown>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  /** request body */
  body?: unknown;
}

export interface ApiBody<T> {
  status: 0 | 401;
  msg: string;
  body: T;
  timestamp: string;
}

export interface TBody<T> extends AxiosResponse {
  data: ApiBody<T>;
}

export interface ResponseResult<T> {
  data: T;
  header: Partial<Record<string, string> & { 'set-cookie'?: string[] }>;
  msg: string;
}
