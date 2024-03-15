<template>
  <div class="layout w-screen">
    <nav class="sidebar fixed h-full z-10 flex flex-col top-0">
      <el-scrollbar class="h-full">
        <logo />
        <side-menu />
      </el-scrollbar>
    </nav>

    <header class="header fixed top-0 z-1">
      <Header />
    </header>

    <section class="container w-auto">
      <main class="main w-full">
        <div class="mx-5">
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component :is="Component" :key="route.name" />
            </keep-alive>
          </router-view>
        </div>
      </main>
    </section>
  </div>
</template>
<script setup name="Layout">
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import SideMenu from './components/side-menu/index.vue'
import Header from './components/header/index.vue'
import Logo from './components/logo/index.vue'

useAppStore().setMenuCollapse()
</script>
<style lang="scss" scoped>
.sidebar {
  width: var(--sidebar-width);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.header {
  height: var(--topbar-height);
  width: calc(100% - var(--sidebar-width));
  transform: translateX(var(--sidebar-width));
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.container {
  flex: 1 0 auto;
  max-width: 100%;
  padding-left: var(--sidebar-width);
  padding-top: var(--topbar-height);
  transition: padding-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
