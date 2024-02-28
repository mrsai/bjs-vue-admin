<script setup>
import { provide } from 'vue'
import { useKey } from '@/utils/hooks/useKey'
import { useRouter } from 'vue-router';

// 注册一个全局可重新加载页面的函数
const globalKey = useKey()
provide('globalKey', {
  globalReload: globalKey.refreshKey,
})

console.log('useRouter', useRouter().getRoutes())
</script>
<template>
  <RouterView :key=" globalKey.$key.value"></RouterView>
</template>

<style scoped>
</style>
