import { ref, reactive } from 'vue';
import {cloneDeep } from 'lodash';
import request from '@/utils/tools/request';

/**
 * api如果遵循 restful 风格，可以传入一个字符串，如 /api/user
 * 如果不遵守，可以传入一个对象，如 {list: '/api/user/list', create: '/api/user/create'}
 * @param {String | Object<String, String>} api
 * @returns Object<String, String>
 * @example
 * const apis = initApi('/api/user')
 */
function initApi(api) {
  const apiKeys = ['list', 'create', 'del', 'edit'];
  const apis = {};
  if (typeof api === 'string') {
    apiKeys.forEach(key => (apis[key] = api));
  } else {
    // TODO: 检查api是否符合要求
  }
  return apis;
}
/**
 * 
 * @param {*} options 
 * @returns 
 * @example
 */
function useRestful(options) {
  const list = ref([]);
  const loading = ref(false);
  // 如果有新的请求 取消掉上一次的请求 防止 race condition
  let lastAbortController;

  // clone 一份初始搜索条件，在重置的时候使用
  const searchRaw = cloneDeep(options.initQuery ? options.initQuery : {});
  // 如果 query 参数中有 _ 开头的，会被认为是静态参数，不会被重置
  const query = ref({});
  // 保存了如果重置的时候，不会被重置的数据
  const staticQuery = []
  // 初始化 query 参数
  if(options.initQuery){
    const initKeys = Object.create(null)
    for (const key in options.initQuery) {
      if(key.startsWith("_")){
        staticQuery.push(key)
        const trimKey = key.replace("_","")
        initKeys[trimKey] = options.initQuery[key]
      }else{
        initKeys[key] = options.initQuery[key]
      }
    }
    query.value = initKeys
  }

  // 生成 api 集合
  options.apis = initApi(options.apis);

  // 生成 分页的 数据
  const pagination = reactive({
    page: 1,
    limit: query.value.limit || 10,
    total: 0,
  })

  // 获取列表
  const fetchList = (reset = false) => {
    if (lastAbortController) {
      lastAbortController.abort();
    }

    const abortController = new AbortController();
    lastAbortController = abortController;

    loading.value = true;
    reset && (list.value = []);

    const requestOptions = {
      ...query.value,
      offset: (pagination.page - 1) * query.value.limit,
      signal: abortController.signal,
    };

    request
      .get(options.apis.list, requestOptions)
      .then(res => {
        if (options.afterResponse) {
          res = options.afterResponse(res);
        }
        list.value = res.list;
        pagination.total = res.total;
      }).catch(err => {
        if (err.message === 'canceled') {
          // Request was aborted
        } else {
          // Handle other errors
        }
      }).finally(() => {
        loading.value = false;
      })
  };
  // 获取单个
  const fetchOne = id => {};
  //增加一个
  const createOne = data => {
    loading.value = true;
    // post 被旧的代码使用了，所以这里使用 _post
    return request._post(options.apis.create, data).then(res => {
      fetchList();
      return Promise.resolve(res)
    }).catch(err=>{
      // Message.error(err.msg)
    }).finally(()=>{
      loading.value = false;
    })
  };

  // 更新一个
  const putOne = (data) => {
    loading.value = true;
    return request.put(`${options.apis.edit}${data.id}/` , data).then(res => {
      fetchList();
      return Promise.resolve(res)
    }).catch(err=>{
      // Message.error(err.msg)
    }).finally(()=>{
      loading.value = false;
    })
  };

  // 更新一个
  const patchOne = (id, data) => {
    loading.value = true;
    return request.patch(`${options.apis.edit}${data.id}/` , data).then(res => {
      fetchList();
      return Promise.resolve(res)
    }).catch(err=>{
      // Message.error(err.msg)
    }).finally(()=>{
      loading.value = false;
    })
  };

  // 删除一个
  const deleteOne = id => {
    loading.value = true;
    return request.delete(`${options.apis.edit}${id}/`).then(res => {
      fetchList();
      return Promise.resolve(res)
    }).finally(()=>{
      loading.value = false;
    })
  };

  // 更新多个
  const batchPut = data => {};

  // 搜索 + 翻页
  const fetchByQuery = pg => {
    pg && (pagination.page = pg);
    fetchList();
  };
  // 重置搜索
  const resetQuery = () => {
    const resetObj = Object.create(null)
    Object.keys(searchRaw).forEach(key => {
      if(!key.startsWith("_")){
        resetObj[key] = searchRaw[key]
      }
    });
    Object.assign(query.value, resetObj);
  };
  //排序获取
  const sortQuery = arg => {};
  // 修改数据
  const handleChangeOptions = (ops = {}) => {};
  !options.delay && fetchList();

  return {
    list,
    query,
    pagination,
    loading,
    fetchList,
    fetchOne,
    createOne,
    putOne,
    patchOne,
    deleteOne,
    batchPut,
    fetchByQuery,
    resetQuery,
    sortQuery,
    handleChangeOptions,
    request
  };
}

export {useRestful};
