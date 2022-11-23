import { computed, reactive, ref, toRefs } from 'vue';
import Fetch from './Fetch';
import { Options, Service } from './types';

function useAxiosImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
) {
  const { manual = false, ready = true, ...rest } = options;

  const fetchOptions = {
    manual,
    ready,
    ...rest,
  };

  // service 实例
  const serviceRef = ref(service);

  // 响应式对象
  const state = reactive<{
    data?: TData;
    loading: boolean;
    params?: TParams;
    error?: Error;
  }>({
    data: undefined,
    loading: false,
    params: undefined,
    error: undefined,
  });

  const setState = (s: any, field?: keyof typeof state) => {
    if (field) {
      state[field] = s;
    } else {
      state.data = s.data;
      state.loading = s.loading;
      state.error = s.error;
      state.params = s.params;
    }
  };

  const fetchInstance = computed(() => {
    const initState: any = {};
    return new Fetch<TData, TParams>(serviceRef, fetchOptions, setState);
  });

  return {
    ...toRefs(state),
    cancel: fetchInstance.value,
  };
}

export default useAxiosImplement;
