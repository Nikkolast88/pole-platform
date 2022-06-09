import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupRouter } from './router';
import {
  setupDirectives,
  setupGlobalMethods,
  setupMicroApps,
  setupI18n,
} from '@/plugins';

async function bootstrap() {
  const app = createApp(App);

  // 注册全局指令
  setupDirectives(app);

  // 注册全局方法
  setupGlobalMethods(app);

  // 注册状态管理器
  setupStore(app);

  // 注册国际化
  setupI18n(app);

  // 注册路由
  const router = setupRouter(app);

  await router.isReady();
  // 注意，尽量使微应用最后注册，先行注册，会导致dom未初始化，id获取不到
  // 注册微前端
  setupMicroApps();
  // 挂载dom
  app.mount('#root');
}

void bootstrap();
