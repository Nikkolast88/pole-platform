<template>
  <el-config-provider :locale="locale" :button="{ autoInsertSpace: true }">
    <template v-if="routeName">
      <router-view></router-view>
    </template>
    <template v-else>
      <div id="container"></div>
    </template>
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { useRoute } from 'vue-router';
import { canUseInfo } from '@pole-platform/open-api';

canUseInfo().then((resp) => {
  console.log(resp.data);
});

const locale = zhCn;
const $route = useRoute();
/** 用于判断是否放入Layout布局组件中 */
const routeName = computed(() => $route.name);
watchEffect(() => {
  console.log(routeName.value);
});
</script>
<style lang="scss">
@import './styles/index';
@import './styles/normalize';

#root {
  width: 100%;
  height: 100%;
  color: var(--el-color-primary);
  font-size: 14px;
}
</style>
