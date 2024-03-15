<template>
  <div class="header-inner flex flex-col h-full shadow px-5">
    <div class="h-15 flex justify-between">
      <div class="flex items-center space-x-6">
        <div
          class="text-xl dark:text-white cursor-pointer"
          :class="settings.isCollapse ? 'i-mdi:menu-close' : 'i-mdi:menu-open'"
          @click="toggleMenu"
        ></div>
        <Breadcrumb />
      </div>
      <div class="flex items-center space-x-2">
        <avatar />
      </div>
    </div>
    <div class="tabs"></div>
  </div>
</template>
<script setup name="LayoutHeader">
import { useAppStore } from '@/stores/app'
import Avatar from './avatar.vue'
import Breadcrumb from './breadcrumb.vue'

const { settings, toggleMenu } = useAppStore()
</script>
<style lang="scss" scoped></style>
