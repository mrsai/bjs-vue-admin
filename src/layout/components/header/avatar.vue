<template>
  <el-dropdown @command="handleCommand">
    <div class="flex items-center space-x-2.5">
      <el-avatar :size="30" src="userInfo.avatar" />
      <span>
        {{ userInfo.name || 'Anonymous' }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="c">个人中心</el-dropdown-item>
        <el-dropdown-item command="a">GitHub</el-dropdown-item>
        <el-dropdown-item command="b">Gitee</el-dropdown-item>
        <el-dropdown-item command="e" divided>登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup name="HeaderAvatar">
import { useUserStore } from '@/stores/user'
import { useRoutes } from '@/utils/hooks/useRouters'
import { routerNames } from '@/router/static'

const { userInfo, logout } = useUserStore()
const { go } = useRoutes()

const handleCommand = async (key) => {
  switch (key) {
    case 'c':
      console.log('个人中心')
      break
    case 'a':
      window.open('')
      break
    case 'b':
      window.open('')
      break
    case 'e':
      await logout()
      go(routerNames.login)
      // 先这样解决。
      window.location.reload()
      console.log('登出')
      break
    default:
      break
  }
}
</script>
<style lang="scss" scoped></style>
