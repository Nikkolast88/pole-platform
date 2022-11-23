import { useRequest } from '@/hooks';
import { useAxios } from '@pole-platform/common';
import { RequestOptions } from '@/hooks/useRequest';

export function onLogin(options: RequestOptions) {
  return useRequest(
    {
      path: '/login',
      method: 'post',
    },
    options,
  );
}

useAxios(0);
