import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/System/SystemView.vue'),
  },
];

export default routes;
