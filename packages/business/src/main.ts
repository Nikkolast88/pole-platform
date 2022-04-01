import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { start } from 'qiankun';
start();
createApp(App).use(router).mount('#app');