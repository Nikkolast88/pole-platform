import { ref } from 'vue';
import { Plugin, Timeout } from '../types';

const useRetryPlugin: Plugin<unknown, unknown[]> = (
  fetchInstance,
  { retryInterval, retryCount },
) => {
  const timerRef = ref<Timeout>();
  const countRef = ref(0);

  const triggerByRetry = ref(false);

  if (!retryCount) {
    return {};
  }

  return {
    onBefore: () => {
      if (!triggerByRetry.value) {
        countRef.value = 0;
      }

      triggerByRetry.value = false;

      if (timerRef.value) {
        clearTimeout(timerRef.value);
      }
    },
    onSuccess: () => {
      countRef.value = 0;
    },
    onError: () => {
      countRef.value += 1;
      if (retryCount === -1 || countRef.value <= retryCount) {
        const timeout =
          retryInterval ?? Math.min(1000 * 2 ** countRef.value, 30000);
        timerRef.value = setTimeout(() => {
          triggerByRetry.value = true;
          fetchInstance.refresh();
        }, timeout);
      } else {
        countRef.value = 0;
      }
    },
  };
};

export default useRetryPlugin;
