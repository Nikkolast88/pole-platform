import { useRequest } from '@/hooks';
import { AxiosClient } from '@/plugins';
import { AxiosResponse } from 'axios';
import { ApiBody, ContentType, FullRequestParams } from '@/plugins/Axios/types';

type RequestParams<T> = FullRequestParams & {
  params?: T;
  body?: T;
};

// AxiosClient.request<TBody>({
//   ...requestParams,
// }),
export function request<TQuery, TBody>(requestParams: RequestParams<TQuery>) {
  return useRequest<TQuery, TBody>(
    AxiosClient.request<TBody>({
      ...requestParams,
    }),
  );
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
    body: params,
    params: params,
    type: ContentType.Json,
  });
}

canUseInfo({ id: 0 }).then((resp) => {
  console.log(resp.data.body.id);
});

useRequest();
