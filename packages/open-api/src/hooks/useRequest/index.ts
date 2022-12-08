import type { Service } from './types';

export function useRequest<TParams, TData>(service: Service<TParams, TData>) {
  // eslint-disable-next-line prefer-rest-params
  const normalArray = Array.prototype.slice.call(arguments)[0];
  return service(normalArray);
}
