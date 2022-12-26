import { isRef, ref } from 'vue';
import { Interval, Plugin } from '../types';
import isDocumentVisible from '@/utils/isDocumentVisible';

const usePollingPlugin: Plugin<unknown, unknown> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true },
) => {
  const timerRef = ref<Interval>();

  const stopPolling = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
  };

  if (isRef(pollingInterval) ? !pollingInterval?.value : !pollingInterval) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      if (!pollingWhenHidden && !isDocumentVisible) {
        return;
      }

      timerRef.value = setInterval(
        () => {
          fetchInstance.refresh();
        },
        isRef(pollingInterval) ? pollingInterval.value : pollingInterval,
      );
    },
  };
};

export default usePollingPlugin;
