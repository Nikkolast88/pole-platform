import { useRequest } from '@/hooks';
import { AxiosClient } from '@/plugins';
import { ContentType } from '@/plugins/Axios/types';
import type { FullRequestParams, TBody } from '@/plugins/Axios/types';

type RequestParams<T> = FullRequestParams & {
  params?: T;
  body?: T;
};

export function request<TParams, TData>(
  requestParams: RequestParams<TParams>,
): Promise<TBody<TData>> {
  return useRequest<TParams, TData>(() => {
    return AxiosClient.request<TData>({ ...requestParams });
  });
}

interface Text {
  id: number;
}

interface BodyText {
  id: number;
}

function canUseInfo(params: Text) {
  return request<Text, BodyText>({
    path: '',
    method: 'get',
    params: params,
    type: ContentType.Json,
  });
}

canUseInfo({ id: 0 }).then((resp) => {
  const { body } = resp.data;
  console.log(body.id);
});
