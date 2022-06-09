import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constantRouter';
import { renderIcon } from '@/utils';
import { ApplicationOne } from '@icon-park/vue-next';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: {
      title: '分析页',
      icon: renderIcon(ApplicationOne),
    },
    children: [
      {
        path: '/dashboard/index',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/DashboardView.vue'),
        meta: {
          title: '分析页',
        },
      },
      // {
      //   path: '/business/*',
      //   name: 'Business',
      //   component: PortalComp,
      // },
    ],
  },
];

export default routes;
