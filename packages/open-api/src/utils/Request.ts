import { useRequest } from '@/hooks';
import { request } from '@/plugins';

import type { UseRequestOptions, Plugin } from '@/hooks';

export function requestService<TData, TParams = unknown>(
  requestParams,
  options?: UseRequestOptions<TData, TParams, unknown>,
  plugins?: Plugin<TData, TParams>[] = [],
) {
  const controller = new AbortController();
  const fn = () =>
    request<TData>(requestParams.path, {
      ...requestParams,
      signal: controller.signal,
    });
  const serviceOptions = {
    ...options,
    controller: controller,
    defaultParams: requestParams,
  };
  return useRequest<TData, TParams>(fn, serviceOptions);
}
