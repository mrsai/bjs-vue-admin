<template>
  <div class="role-list">
    <el-card>
      <el-form :model="formData" label-width="auto">
        <el-form-item label="角色名称">
          <el-input type="text" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色绑定值">
          <el-input type="text" v-model="formData.key"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <div class="bg-gray-200" v-loading="response.loading">
            <el-tree v-if="permissionList" :data="permissionList" :expand-on-click-node="false">
              <template #default="{ data }">
                <span class="custom-tree-node">
                  <div class="font-bold">{{ data.meta ? data.meta.title : data.name }}</div>
                  <div v-if="!variate.isEmpty(data)" class="py-2 px-2">
                    <el-checkbox
                      v-for="(it, key) in data.meta.auth"
                      :key
                      v-model="it.val"
                      :label="it.txt"
                    />
                  </div>
                </span>
              </template>
            </el-tree>
          </div>
        </el-form-item>

        <div class="flex space-x-5 mt-lg">
          <el-button type="primary" @click="handleEdit">修改</el-button>
          <el-button>返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup name="RoleList">
import { reactive, onMounted, ref } from 'vue'
import { useRouteStore } from '@/stores/route'
import { deepClone, variate } from '@/utils/tools'
import { useFetch } from '@/utils/hooks/useFetch'
const { routesRaw, mergeAccessRouters, accessible } = useRouteStore()

const formData = reactive({
  name: '',
  key: '', // 需要服务端验证唯一性，这个 key 在客户端是唯一的，表明该角色的唯一标识，比如 admin，并且不可编辑。
  auth: []
})

const { fetchData, response } = useFetch({
  url: '/api/auth/',
  delay: true
})

const permissionList = ref(routesRaw)

const handleEdit = () => {
  const queue = [...permissionList.value]
  const auth = Object.create(null)
  while (queue.length) {
    let node = queue.shift()
    if (accessible(node) && !variate.isEmpty(node.meta.auth)) {
      auth[node.path] = node.meta.auth
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        queue.push(node.children[i])
      }
    }
  }
  console.log('submit', JSON.stringify(auth))
}

onMounted(async () => {
  await fetchData()
  permissionList.value = mergeAccessRouters(deepClone(routesRaw), response.data)
})
</script>
<style lang="scss" scoped>
.role-list {
  :deep(.el-tree-node) {
    white-space: pre-wrap;
  }
  :deep(.el-tree-node__content) {
    height: auto;
    align-items: start;
  }
  :deep(.el-tree-node__expand-icon) {
    padding: 8px 4px;
  }
}
</style>
