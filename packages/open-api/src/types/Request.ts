import type { FullRequestParams } from '@/plugins/axios/types';

export type RequestParams<T> = FullRequestParams & {
  params?: T;
  body?: T;
};
