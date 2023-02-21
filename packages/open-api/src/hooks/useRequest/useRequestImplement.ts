import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import Fetch from './Fetch';
import { Plugin, Service, UseRequestOptions, Result } from './types';
function useRequestImplement<TData, TParams>(
  service: Service<TData, TParams>,
  options: UseRequestOptions<TData, TParams, unknown> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const serviceRef = ref(service);

  const state = reactive<{
    data?: TData;
    headers?: unknown;
  }>({
    data: undefined,
    headers: undefined,
  });

  const setState = (s: any, field?: keyof typeof state) => {
    if (field) {
      state[field] = s;
    } else {
      state.data = s.data;
    }
  };

  const fetchOptions = options;

  const fetchInstance = computed(() => {
    return new Fetch<TData, TParams>(serviceRef, fetchOptions, setState as any);
  });

  fetchInstance.value.pluginImpls = plugins.map((p) => {
    return p(fetchInstance.value, fetchOptions);
  });

  onMounted(() => {
    fetchInstance.value.run();
  });

  return Promise.resolve({
    ...toRefs(state),
    runAsync: fetchInstance.value.runAsync.bind(fetchInstance.value),
  } as Result<TData, TParams>);
}

export default useRequestImplement;
