<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
    @click="goto"
  >
    <template v-for="menu in data.menuList" :key="menu.routeName">
      <a-menu-item :key="menu.routeName" v-if="menu.children.length === 0">
        <template #icon>
          <i :class="'iconfont ' + menu.icon"></i>
        </template>
        <span @click="goto(menu.routeName)">{{menu.title}}</span>
      </a-menu-item>
    </template>


  </a-menu>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const data = reactive({
  menuList: [
    {
      id: 1,
      icon: "icon-home",
      title: "用户列表", // 菜单名
      routeName: "user_list", // 路由名称
      children :[],
    },
    {
      id: 2,
      icon: "icon-tushu",
      title: "图书列表", // 菜单名
      routeName: "admin_book_list",
      children :[],
    },
  ]
})
const router = useRouter()

// 跳转函数
function goto(event) {
  if (event.key === ""){
    return;
  }
  router.push({
    name: event.key,
  })
}

const selectedKeys = ref([])
import {reactive} from "vue";
const state = reactive({
      selectedKeys: [],
      openKeys: [],
    })
</script>