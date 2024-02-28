<template>
  <div class="layout full">
    <h1>I am service Page</h1>
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide-right" mode="out-in" appear>
        <KeepAlive>
          <component :is="Component" :key="route.name" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
<script setup name="Layout">
import { RouterView } from 'vue-router'

</script>
<style lang="scss" scoped></style>
