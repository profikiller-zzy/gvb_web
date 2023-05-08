<!-- 主题切换组件 -->

<template>
  <i v-if="globalStore.Theme" class="fa fa-moon-o" @click="switchTheme"></i>
  <i v-else class="fa fa-sun-o" @click="switchTheme"></i>
</template>

<script setup>
import {useGlobalStore} from "@/stores/global_store";

// 常量都用大写开头定义
const globalStore = useGlobalStore()
globalStore.loadTheme()

// 切换白天黑夜主题
function switchTheme() {
  globalStore.switchTheme()
}
</script>

<style>
</style>