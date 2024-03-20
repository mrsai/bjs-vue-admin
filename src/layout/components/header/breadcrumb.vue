<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="bread in breadCrumbs"
      :key="bread.path"
      :to="{ path: bread.last ? null : bread.path }"
    >
      <div class="flex space-x-1 items-center text-lg">
        <div :class="bread.icon" v-if="bread.icon && !bread.last"></div>
        <span class="text-sm">{{ bread.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup name="Breadcrumb">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

/**
 * 有多种方案来实现面包屑的动态更新功能
 * 1.在 guard 文件的 router.after 中更新面包屑，然后将其挂载到 store 中
 * 2.使用订阅发布实践，在 guard 文件中发射一个 router change 的事件，然后在组件注册该事件更新
 * 3.使用onBeforeRouteUpdate，在其中更新计算面包屑，但是要多在mounted中进行初始化操作
 * 4.在生成动态路由的时候，同时也生成一份面包屑数据，用的时候直接获取currentRouter中的面包屑
 * 5.watch router path，然后计算面包屑
 */

const breadCrumbs = ref([])
const router = useRouter()
const route = useRoute()

function generateBreadCrumbs(toPath) {
  const list = []
  router.currentRoute.value.matched.reduce((pre, cur) => {
    const { path, name, meta } = cur
    pre.push({
      path,
      name,
      icon: meta.icon,
      title: meta.title,
      last: path === toPath
    })
    return pre
  }, list)
  return list
}

watch(
  () => route.path,
  (n, o) => {
    if (n && n !== o) {
      breadCrumbs.value = generateBreadCrumbs(n)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped></style>
