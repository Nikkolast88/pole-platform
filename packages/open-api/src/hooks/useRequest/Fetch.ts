import { Ref } from 'vue';
import { PluginReturn, Service, UseRequestOptions, FetchState } from './types';
export default class Fetch<TData, TParams> {
  pluginImpls: PluginReturn[];

  state: FetchState<TData, TParams> = {
    params: undefined,
    data: undefined,
  };

  constructor(
    public serviceRef: Ref<Service<TData, TParams>>,
    public options: UseRequestOptions<TData, TParams, unknown>,
    public setUpdataData: (
      s: any,
      key?: keyof FetchState<TData, TParams>,
    ) => void,
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this.state.params = options.defaultParams;
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.setUpdataData(this.state);
  }

  runPluginHandler(event, ...rest) {
    const r = (this.pluginImpls?.map((i) => i[event]?.(...rest)) ?? [])?.filter(
      Boolean,
    );
    return Object.assign({}, ...r);
  }

  async runAsync(params: TParams): Promise<TData> {
    this.runPluginHandler('onBefore', params);

    try {
      const servicePromise = this.serviceRef.value(params);
      const res = await servicePromise;

      this.runPluginHandler('onSuccess', res, params);

      this.runPluginHandler('onFinally', params);

      this.setState({
        data: res,
      });
      return res;
    } catch (error) {
      this.runPluginHandler('onError', error, params);

      this.runPluginHandler('onFinally', params);
      throw error;
    }
  }

  run() {
    this.runAsync(this.state.params);
  }

  refresh() {
    this.run();
  }
}
