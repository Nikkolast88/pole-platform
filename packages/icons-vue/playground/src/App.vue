<script setup lang="ts">
import { icons } from '@pole-platform/icons-vue/global';
</script>

<template>
  <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
  <hr />
  <component
    :is="`PpIcon${key}`"
    v-for="key in Object.keys(icons)"
    :key="key"
    class="icon"
  />
</template>

<style scoped>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
