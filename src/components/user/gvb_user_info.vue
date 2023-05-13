<template>
  <div class="gvb_user_info">
    <div class="avatar" v-if="isAvatarDisplay">
      <img src="http://rt8ywig7i.bkt.clouddn.com/background_1.jpg" alt="头像">
    </div>
    <div class="drop-menu">
      <a-dropdown :placement="bottomLeft">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          {{data.nick_name}} <a-icon type="down" />
          <i class="fa fa-caret-down"></i>
        </a>
      <template #overlay>
        <a-menu @click="menuItemClick">
          <a-menu-item key = "my_borrow_record">
            <a href="javascript:;">我的借阅记录</a>
          </a-menu-item>
          <a-menu-item key = "user_login">
            <a href="javascript:;">返回登录</a>
          </a-menu-item>
          <a-menu-item key = "user_logout">
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
import {userLogoutApi} from "@/api/user_api";
import {message} from "ant-design-vue";
import {useGlobalStore} from "@/stores/global_store";
import {reactive} from "vue";

const data = reactive({
  nick_name: ""
})
const router = useRouter()
const route = useRoute()
const props = defineProps({
  // 是否显示头像部分
  isAvatarDisplay: {
    type: Boolean,
    default: false,
  }
})

function loadNickName() {
  data.nick_name = useGlobalStore().userInfo.nick_name
}

async function menuItemClick({key}) {
  if (key == "user_logout"){
    let res = await userLogoutApi()
    if (res.code) {
      message.error("注销失败")
      return
    }
    message.success("注销成功")
    router.push({
      name: "user_login"
    })
    return
  } else if(key === "user_login") {
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

loadNickName()
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