import { ContentType } from '@/plugins/Axios/types';
import { request } from '@/utils/Request';

interface Text {
  id: number;
}

interface BodyText {
  id: number;
}

export function canUseInfo(params: Text) {
  return request<Text, BodyText>({
    path: '',
    method: 'get',
    params: params,
    type: ContentType.Json,
  });
}
