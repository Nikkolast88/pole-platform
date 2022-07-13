import { getCurrentInstance, ref } from 'vue';
import AxiosClient, { FullRequestParams } from '@/plugins/Axios';
import { DefaultOptions } from './constants';
export interface RequestOptions {
  try_count: number;
}

const finalOptions = { ...DefaultOptions };
const {
  onSuccess,
  initialData,
  onError,
  onFinally,
  pollingInterval,
  pollingSinceLastFinished,
} = finalOptions;

export const useRequest = (
  params: FullRequestParams,
  options: RequestOptions,
) => {
  const data = ref(initialData);
  const error = ref<Error>();
  // let count = 0;
  const promiseService = () =>
    new Promise((resolve, reject) => {
      AxiosClient.request(params).then(resolve).catch(reject);
    });
  let isVisible = ref(true);
  // if (getCurrentInstance()) {}
  function _run() {
    return promiseService()
      .then((res) => {
        data.value = res;
        onSuccess(res);
      })
      .catch((err) => {
        error.value = err;
        onError(err);
      })
      .finally(() => {
        onFinally();
      });
  }
  let run = _run;

  let pollingTimer: number;
  if (pollingInterval && pollingSinceLastFinished) {
    if (pollingSinceLastFinished && !isVisible.value) {
      run = () => {
        if (pollingTimer) {
          clearInterval(pollingTimer);
        }
        pollingTimer = setInterval(() => {
          if (!isVisible.value) {
            return;
          }
          _run();
        }, pollingInterval);
        return _run;
      };
    }
  }

  return {
    data,
    error,
  };
};
