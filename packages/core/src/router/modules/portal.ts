import { RouteRecordRaw } from 'vue-router';
import { PortalComp } from '@/router/constantRouter';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/business/*',
    name: 'PortalBusiness',
    component: PortalComp,
    meta: {
      title: '业务',
      hidden: true,
    },
  },
];

export default routes;
