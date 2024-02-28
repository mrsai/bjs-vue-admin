import { reactive, ref } from 'vue'
import request from '@/utils/tools/request'

/**
 * @param { Object } urls 请求的键值对
 * @returns 响应式的返回结果
 * @example
 * const { resp:options }  = useRequest({
    course:"/edu_admin/data_admin/department/query_all/?term=latest&uv_id=43",
    b:"/edu_admin/data_admin/common/college_authority_project_train_settings/?_date=1697177315784&term=latest",
    c:"/api/open/plug/audiovideo/permissions?term=latest&uv_id=43"
});
 */
function useRequest(urls) {
  const create = () => {
    const mutKey = []
    const apis = []
    const result = {}
    Object.keys(urls).forEach((key) => {
      mutKey.push(key)
      apis.push(urls[key])
      result[key] = ref([])
    })
    return {
      mutKey,
      apis,
      result
    }
  }

  const { mutKey, apis, result } = create()
  const data = reactive(result)

  function refresh() {
    request.multiple(apis).then((data) => {
      mutKey.forEach((key, index) => {
        data[key] = ref(data[index].data)
      })
    })
  }

  refresh()

  return {
    data,
    request,
    refresh
  }
}

export { useRequest }
