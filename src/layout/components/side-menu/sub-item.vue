<template>
  <template v-for="child in subs">
    <el-sub-menu
      :index="child.path"
      :key="child.path"
      v-if="child.children && child.children.length > 0"
    >
      <template #title>
        <div :class="child.meta.icon" class="text-lg shrink-0 mr-3" />
        <span>{{ child.meta.title }}</span>
      </template>
      <sub-item :subs="child.children" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item :index="child.path" :key="child.path">
        <template v-if="!child.meta.isLink || (child.meta.isLink && child.meta.isIframe)">
          <div :class="child.meta.icon" class="text-lg shrink-0 mr-3" />
          <span>{{ child.meta.title }}</span>
        </template>
        <template v-else>
          <a class="w-100" @click.prevent="onALinkClick(child)">
            <div :class="child.meta.icon" class="text-lg shrink-0 mr-3" />
            {{ child.meta.title }}
          </a>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup name="SubItem">
defineProps({
  // 菜单列表
  subs: {
    type: Array,
    default: () => []
  }
})
</script>
