import { AxiosResponse } from 'axios';
import { ApiBody } from '@/plugins/Axios/types';

export interface TParams extends AxiosResponse<ApiBody<TData>> {}
