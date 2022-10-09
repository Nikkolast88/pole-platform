<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import { start } from 'qiankun';
import { onMounted } from 'vue';
onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    start();
  }
});
</script>
