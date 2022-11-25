import { AxiosResponse } from 'axios';
import { ApiBody } from 'src/plugins/Axios/types';
import { Service, AxiosService } from './types';

export function useRequest<TParams, TData>(
  service: Promise<AxiosResponse<ApiBody<TData>, TData>>,
): Promise<AxiosResponse<ApiBody<TData>, TData>> {
  return service();
}
