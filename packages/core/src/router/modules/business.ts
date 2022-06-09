import { RouteRecordRaw, RouterView } from 'vue-router';
import { Layout } from '@/router/constantRouter';
import { renderIcon } from '@/utils';
import { ApplicationOne } from '@icon-park/vue-next';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/business',
    name: 'Business',
    redirect: '/business/system',
    component: Layout,
    meta: {
      title: '业务管理',
      icon: renderIcon(ApplicationOne),
    },
    children: [
      {
        path: '/business/system',
        name: 'BusinessSystem',
        component: RouterView,
        meta: {
          title: '业务',
        },
      },
    ],
  },
];

export default routes;
