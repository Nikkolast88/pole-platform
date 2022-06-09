import type { RouteRecordRaw } from 'vue-router';
const constantRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginView.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/Exception/NotFound.vue'),
    meta: {
      title: '404',
    },
  },
];
/**
 * 只给vue-router使用,布局组件需要 () => import('@/views/Layout/LayoutComp.vue')
 * @returns {Array<RouteRecordRaw>}
 */
export const Layout = () => import('@/components/Layout/LayoutComp.vue');
export const PortalComp = () => import('@/components/Portal/PortalComp.vue');
export { constantRouter };
