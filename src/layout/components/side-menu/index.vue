<template>
  <el-menu
    :collapse="settings.isCollapse"
    :collapse-transition="false"
    :default-active="$route.meta.activePath || $route.path"
  >
    <template v-for="it in menus" :key="it.path">
      <el-sub-menu v-if="it.children && it.children.length" :index="it.path">
        <template #title>
          <div :class="it.meta.icon" class="text-lg mr-3 shrink-0"></div>
          <span>{{ it.meta.title }}</span>
        </template>
        <SubItem :subs="it.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="it.path">
        <div :class="it.meta.icon" class="text-lg mr-3 shrink-0"></div>
        <template #title v-if="!it.meta.isLink">
          <span>{{ it.meta.title }}</span>
        </template>
        <template #title v-else>
          <a class="w-100" @click.prevent="onALinkClick(it)">{{ it.meta.title }}</a>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup name="SideMenu">
import { useRouteStore } from '@/stores/route'
import { useAppStore } from '@/stores/app'
import SubItem from './sub-item.vue'

const { menus } = useRouteStore()
const { settings } = useAppStore()

</script>
