import { Router } from 'vue-router';
const childrenPath = window.manifest.APPS.map((el) => el.activeRule);
/**
 * @description: 路由守卫
 * @param {Router} router
 * @return {*}
 */
export function createRouterGuards(router: Router): void {
  // 路由进入前
  router.beforeEach(async (to, form, next) => {
    if (!history.state.current) {
      Object.assign(history.state, { current: form.fullPath });
    } else if (to.name) {
      next();
    } else if (childrenPath.some((item) => to.path.includes(item))) {
      next();
    } else {
      next('/404');
    }
  });
}
