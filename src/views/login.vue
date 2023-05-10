<template>
  <div class="container">
    <form action="#" class="login-form">
      <h2>登 录</h2>
      <a-input type="text" v-model:value="data.user_name" placeholder="请输入用户名">
        <template>
          <i class="icon icon-yonghuming"></i>
        </template>
      </a-input>
      <a-input type="password" v-model:value="data.password" placeholder="请输入密码">
        <template>
          <i class="icon icon-mima"></i>
        </template>
      </a-input>
      <a-button type="submit" @click="emailLogin">登录</a-button>
    </form>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import { message } from 'ant-design-vue';
import axios from "axios";
import {Ser} from "@/service/service";
import {emailLoginApi} from "@/api/emailLogin";

const data = reactive({
  user_name: "",
  password: "",
})

async function emailLogin(){
  if (data.user_name.trim() === ""){
    message.error("请输入用户名!")
    return
  }
  if (data.password.trim() === ""){
    message.error("请输入密码!")
    return
  }

  let res = await emailLoginApi(data)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://starry-lixu.oss-cn-hangzhou.aliyuncs.com/202209141908599.jpg") fixed no-repeat;
  background-size: cover;
}

.login-form {
  width: 240px;
  height: 220px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
  overflow: hidden; /* 隐藏多余的模糊效果*/
}

.login-form::before {
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  z-index: -1;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}

.login-form input::placeholder {
  color: #3d5245;
}


.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  margin-top: 24px;
  background-color: rgba(57, 88, 69, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover {
  background-color: rgba(12, 80, 38, 0.67);
}

</style>