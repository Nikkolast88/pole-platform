/* eslint-disable @typescript-eslint/no-empty-function */
import { UseRequestOptions } from './types';

export const DefaultOptions = {
  onSuccess: () => {},
  onError: () => {},
  onFinally: () => {},
  initialData: undefined,
  defaultLoading: false,
  pollingInterval: 0,
  pollingSinceLastFinished: true,
  pollingWhenHidden: true,
} as UseRequestOptions;
