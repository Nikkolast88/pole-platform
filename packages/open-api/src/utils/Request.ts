import { useRequest } from '@/hooks';
import { AxiosClient } from '@/plugins';
import { ContentType, FullRequestParams, TBody } from '@/plugins/Axios/types';

type RequestParams<T> = FullRequestParams & {
  params?: T;
  body?: T;
};

export function request<TParams, TData>(requestParams: RequestParams<TParams>) {
  // return useRequest<TParams, TBody>((requestParams) => {
  //   return AxiosClient.request<TBody>({ ...requestParams });
  // });
  // return AxiosClient.request<TBody>({
  //   ...requestParams,
  //   body: requestParams.method === 'post' || requestParams.body,
  // });
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
  console.log(body);
});
