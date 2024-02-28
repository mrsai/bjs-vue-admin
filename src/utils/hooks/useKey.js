import { ref } from 'vue'

/**
 * 这个 hooks 用来生成一个 key
 * 并且提供一个 refreshKey 方法，用来刷新 key
 * 主要用来解决一些需要强制刷新组件或者路由的场景
 * @returns $key refreshKey
 * @example
  const routeKey = useKey();
  <HelloWorld msg="You did it!" :key="routeKey.$key.value"/>
  <div c-on:click="routeKey.refreshKey">clickme for refresh route {{ routeKey.$key }}</div>
 */
export function useKey() {
  const $key = ref(0);
  const refreshKey = ()=> {
    $key.value = $key.value + 1
  }

  return {
    $key,
    refreshKey,
  }
}