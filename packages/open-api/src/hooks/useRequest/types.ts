import { AxiosResponse } from 'axios';
import { ApiBody } from 'src/plugins/Axios/types';
export interface UseRequestOptions<R = unknown> {
  onSuccess: (data: R) => void; // 成功回调
  onError: (e: Error) => void; // 失败回调
  onFinally: () => void; // finally回调
  initialData: R;
  defaultLoading: boolean; // 默认加载状态
  pollingInterval: number; // 轮询时间
  pollingSinceLastFinished: boolean; // 轮询时间是否是上一次结束时间
  pollingWhenHidden: boolean; // 屏幕隐藏时，停止轮询
}

export type Service<TParams, TData> = (params: TParams) => Promise<TData>;
export type AxiosService<TData, any> = () => Promise<TData>;
