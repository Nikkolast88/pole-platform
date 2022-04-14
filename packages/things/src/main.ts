import './public-path';

import { lifeCycle } from '@/plugins';
import { SingleApp } from './plugins/modules/SingleApp';

const { bootstrap, mount, unmount } = lifeCycle();
export { bootstrap, mount, unmount };
// lifeCycle();
const __qiankun__ = window.__POWERED_BY_QIANKUN__;
__qiankun__ || SingleApp();
