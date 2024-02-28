<script setup lang="ts">
import { useAuth } from '@/utils/hooks/useAuth'
defineOptions({
  name: 'AuthController',
})

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})

function check() {
  return useAuth().auth(props.value)
}
</script>

<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>
