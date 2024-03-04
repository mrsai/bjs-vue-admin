<script setup>
import { readonly } from 'vue'

const elementPlusConfig  = readonly({
  size: 'small',
  zIndex: 2000
})

</script>
<template>
  <el-config-provider :size="elementPlusConfig.size" :z-index="elementPlusConfig.zIndex">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
</style>
