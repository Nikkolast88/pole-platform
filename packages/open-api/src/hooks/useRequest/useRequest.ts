import usePollingPlugin from './plugins/usePollingPlugin';

import useRequestImplement from './useRequestImplement';

import type { Service, UseRequestOptions, Plugin } from './types';

function useRequest<
  TData,
  TParams,
  PluginsOptions extends Plugin<TData, TParams>[] = [],
>(
  service: Service<TData, TParams>,
  options?: UseRequestOptions<TData, TParams, unknown>,
  plugins?: PluginsOptions,
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    usePollingPlugin,
  ] as Plugin<TData, TParams>[]);
}

export default useRequest;
