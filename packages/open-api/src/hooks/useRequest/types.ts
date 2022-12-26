import { Ref } from 'vue';
import Fetch from './Fetch';

export type UseRequestOptions<TData, TParams, TPlugin> = {
  [K in keyof TPlugin]: TPlugin[K];
} & {
  defaultParams?: TParams;
  controller?: AbortController;

  // 轮询
  pollingInterval?: number | Ref<number>;
  pollingWhenHidden?: boolean;

  // 错误重试
  retryCount?: number;
  retryInterval?: number;

  [x: string]: unknown;
};

export type Service<TData, TParams> = (params: TParams) => Promise<TData>;

export interface FetchState<TData, TParams> {
  params?: TParams;
  data?: TData;
  header?: unknown;
}

export type Plugin<TData, TParams, TPlugin = unknown> = {
  (
    fetchInstance: Fetch<TData, TParams>,
    options: UseRequestOptions<TData, TParams, TPlugin>,
  ): PluginReturn;
};

/**
 * 插件返回
 */
export interface PluginReturn {
  onBefore?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onFinally?: () => void;
}

export interface Result<TData, TParams> {
  data: Ref<TData | undefined>;
  runAsync: Fetch<TData, TParams>['runAsync'];
}

export type Timeout = ReturnType<typeof setTimeout>;

export type Interval = ReturnType<typeof setInterval>;
