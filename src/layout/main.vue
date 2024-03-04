<template>
  <div class="layout full">
    <h1>
      I am Main Page
    </h1>
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide-right" mode="out-in" appear>
        <KeepAlive>
          <component :is="Component" :key="route.name" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
<script setup name="Main">
import { RouterView } from 'vue-router'
import { useKey } from '@/utils/hooks/useKey';

const globalKey = useKey()

</script>
<style lang="scss" scoped></style>
