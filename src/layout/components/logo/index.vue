<template>
  <h1 class="text-center text-gray-700 dark:text-white text-xl flex items-center justify-center h-12 hidden">
    <span class="icon-font i-mdi:vuejs text-5xl color-green-700"></span>
    <Transition name="logo-slide-fade">
      <span v-show="!settings.isCollapse">Bjs Vue Admin</span>
    </Transition>
  </h1>
</template>
<script setup name="SiteLogo">
import { useAppStore } from '@/stores/app'
const { settings } = useAppStore()
</script>
<style lang="scss" scoped>
.logo-slide-fade-enter-active {
  transition: all 0.3s ease-out 0.2s;
}

.logo-slide-fade-leave-active {
  opacity: 0;
}

.logo-slide-fade-enter-from,
.logo-slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
