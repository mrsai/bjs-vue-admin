<template>
  <div class="role-list">
    <el-card>
      <el-tree :data="routesRaw">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ data.meta ? data.meta.title : data.meta }}</span>
            <span>
              <!-- {{ data }} -->
              <!-- <a @click="append(data)"> Append </a>
              <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>
<script setup name="RoleList">
import { useRouteStore } from '@/stores/route'
const { routesRaw } = useRouteStore()
</script>
