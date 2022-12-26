import { requestService } from '@/utils/request';
import { ContentType } from '@/plugins/axios/types';

import type { BodyText } from './types';

export function canUseInfo() {
  return requestService<BodyText>({
    path: '/iot-api/login/getVerifyImg',
    method: 'post',
    type: ContentType.Json,
  });
}
