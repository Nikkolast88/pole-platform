// setup 注册对应插件
import { createApp } from 'vue';
import type { App } from 'vue';
import { createWebHistory, RouteRecordRaw, RouterHistory } from 'vue-router';
import Root from '@/App.vue';
import { setupStore } from '@/store';
import { setupI18n } from '..';
import { setupRouter } from '@/router';
interface Props {
  routes?: RouteRecordRaw[];
  routerBase?: string;
  container?: Element | null;
}

let instance: App<Element> | null = null;
let router = null;
let history: RouterHistory;
export const setupRender = async (props: Props): Promise<void> => {
  const { routes, routerBase, container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? routerBase : '/');
  instance = createApp(Root);

  // pinia 状态注册
  setupStore(instance);
  // 国际化注册
  setupI18n(instance);

  // 路由注册
  router = setupRouter(instance, history, routes);
  await router.isReady();

  const _container = container ? container.querySelector('#app') : '#app';
  instance.mount(_container as Element | string);
};

export const unMounted = (): void => {
  if (instance) {
    instance.unmount();
    if (instance._container) {
      instance._container.innerHTML = '';
    }
  }
  instance = null;
  router = null;
  history.destroy();
};
