import { useRoute, useRouter } from "vue-router";
import { nextTick } from "vue";

function useRoutes() {

  const route = useRoute();
  const router = useRouter();

  const To403 = ( to = true ) => {
    if( route.name !== "403" && to) {
      router.push({name:"403"});
    }
  }

  const go = (params) => router.push(params)

  const back = () => router.go(-1);

  const id = route.params.id || route.query.id;

  const reload = (params) => {
    router.replace(params)
    nextTick(() => {
      window.location.reload();
    })
  }

  return {
    query: route.query,
    params: route.params,
    router,
    route,
    id,
    go,
    back,
    To403,
    reload
  }

}

export {useRoutes};
