import { ref } from 'vue';
import { Service, Options } from './types';
import useAxiosImplement from './useAxiosImplement';
function useAxios<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
) {
  return useAxiosImplement<TData, TParams>(service, options);
}

export default useAxios;
