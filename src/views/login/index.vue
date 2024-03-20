<template>
  <div class="login">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card>
          <el-form label-width="auto" ref="formRef" :model="formData" :rules="rules" size="large">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.password" />
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup name="Login">
import { ref, readonly } from 'vue'
import { useForm } from '@/utils/hooks/useForm'
import { useUserStore } from '@/stores/user'
import { useRoutes } from '@/utils/hooks/useRouters'
import { set } from '@vueuse/core'

const { login } = useUserStore()
const { redirectToDefault } = useRoutes()
const formRef = ref(null)

const { formData, validate } = useForm(formRef, {
  username: 'admin',
  password: ''
})

const rules = readonly({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

async function handleLogin() {
  try {
    await validate()
    const resp = await login(formData.username, formData.password)
    if (resp && resp.data && resp.data.success) {
      redirectToDefault()
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss" scoped></style>
