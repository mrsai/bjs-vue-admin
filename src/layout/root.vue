<template>
  <div class="layout full">
    <nav>
      <RouterLink to="/service">服务</RouterLink>
      <RouterLink to="/recommend">推荐</RouterLink>
    </nav>
    <RouterView v-slot="{ Component, route }">
      <KeepAlive>
        <component :is="Component" :key="route.name" />
      </KeepAlive>
    </RouterView>
  </div>
</template>
<script setup name="Layout">
import { RouterLink, RouterView } from 'vue-router'

</script>
<style lang="scss" scoped></style>
