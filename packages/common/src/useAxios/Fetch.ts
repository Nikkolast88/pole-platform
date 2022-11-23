import { Ref } from 'vue';
import { FetchState, Options, Service } from './types';

export default class Fetch<TData, TParams extends any[] = any> {
  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    public serviceRef: Ref<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public setUpdataData: (
      s: any,
      key?: keyof FetchState<TData, TParams>,
    ) => void,
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
    };

    // 设置state
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.setUpdataData(this.state);
  }

  async runAsync(params: TParams): Promise<TData> {
    try {
      let servicePromise = '';
      if (!servicePromise) {
        servicePromise = this.serviceRef.value
      }
    } catch (error) {

    }
  };

  cancel() {
    this.setState({
      loading: false,
    });
  }
}
