<template>
  <div class="gvb_user_info">
    <div class="avatar" v-if="isAvatarDisplay">
      <img src="http://rt8ywig7i.bkt.clouddn.com/background_1.jpg" alt="头像">
    </div>
    <div class="drop-menu">
      <a-dropdown :placement="bottomLeft">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          用户名 <a-icon type="down" />
          <i class="fa fa-caret-down"></i>
        </a>
      <template #overlay>
        <a-menu @click="menuItemClick">
          <a-menu-item key = "user_center">
            <a href="javascript:;">个人中心</a>
          </a-menu-item>
          <a-menu-item key = "my_message">
            <a href="javascript:;">我的消息</a>
          </a-menu-item>
          <a-menu-item key = "article_list">
            <a href="javascript:;">文章列表</a>
          </a-menu-item>
          <a-menu-item key = "login">
            <a href="javascript:;">返回登录</a>
          </a-menu-item>
          <a-menu-item key = "logout">
            <a href="javascript:;">注销退出</a>
          </a-menu-item>
        </a-menu>
      </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const props = defineProps({
  // 是否显示头像部分
  isAvatarDisplay: {
    type: Boolean,
    default: false,
  }
})

function menuItemClick({key}) {
  if (key == "logout"){
    console.log("logout")
    return
  } else if(key === "login") {
    router.push(
        {
          name: key,
          redirect_url: route.path
        }
    )
  } else {
    router.push(
        {
          name: key,
        }
    )
  }
}
</script>

<style>
.gvb_user_info{
  display: flex;

  align-items: center;
}

img {
  width: 35px;
  height: 35px;
  border-radius: 30%;
}

.drop-menu {
  margin-left: 10px;
}
</style>