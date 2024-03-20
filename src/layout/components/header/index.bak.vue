<template>
  <div class="layout">
    {{ isDark }}
    <el-button @click="changeTheme">{{ isDark ? 'dark' : 'light' }}</el-button>
    <el-switch
      v-model="isDark"
      inline-prompt
      active-text="dark"
      size="large"
      inactive-text="light"
      @change="toggleDark"
    />
    <div class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>
    <!-- 
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table> -->

    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <h1>I am service Page</h1>
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide-right" mode="out-in" appear>
        <KeepAlive>
          <component :is="Component" :key="route.name" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
<script setup name="Layout">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()

const toggleDark = useToggle(isDark)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const changeTheme = () => {
  toggleDark()
  // document.body.classList.toggle('dark')
}
</script>
<style lang="scss" scoped></style>
