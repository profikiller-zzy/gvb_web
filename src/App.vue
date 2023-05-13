<template>
  <router-view/>
  <a-modal
    v-model:visible="visible"
    title="请选择你的身份"
    :confirm-loading="confirmLoading"
    @ok="okHandle"
  >
      <a-button type="primary" @click="go_to_user_login">用户</a-button>
      <a-button type="primary" @click="go_to_admin_login">管理员</a-button>
  </a-modal>
</template>

<script setup>
import {useGlobalStore} from "@/stores/global_store";
import {ref} from "vue";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter()
const globalStore = useGlobalStore()
const visible = ref(false)
const confirmLoading = ref(false)

function go_to_user_login() {
  router.push({
    path: "/user_login"
  })
  visible.value = false
  message.success("跳转至管理员登录界面")
}

function go_to_admin_login() {
  router.push({
    path: "/admin_login"
  })
  visible.value = false
  message.success("跳转至用户登录界面")
}

function okHandle() {
  visible.value = false
}

function loadInfo() {
  let isUserValid = globalStore.loadUserInfo()
  let isAdminValid = globalStore.loadAdminInfo()
  if (isUserValid && isAdminValid) {
    message.warn("登录状态已经过期")
    visible.value = true
  }
}
loadInfo()
</script>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --active: ＃00BFFF;
  --tetx: ＃00BFFF;
}
</style>
