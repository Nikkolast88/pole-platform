import { useRequest } from '@/hooks';
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
