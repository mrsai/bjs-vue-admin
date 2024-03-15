<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <div class="flex space-x-1 items-center text-lg">
        <div class="i-mdi:drawing-box"></div>
        <span class="text-sm">日志</span>
      </div>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <div class="flex space-x-1 items-center text-lg">
        <span class="text-sm">日志列表</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup name="Breadcrumb"></script>
<style lang="scss" scoped></style>
