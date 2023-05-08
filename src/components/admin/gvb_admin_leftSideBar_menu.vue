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

      <a-sub-menu :key="menu.routeName" v-else>
        <template #icon><i :class="'iconfont ' + menu.icon"></i></template>
        <template #title>{{menu.title}}</template>
          <a-menu-item v-for="sub_menu in menu.children" :key="sub_menu.routeName">
            <template #icon>
              <i :class="'iconfont ' + sub_menu.icon"></i>
            </template>
            <span @click="goto(menu.routeName)">{{sub_menu.title}}</span>
          </a-menu-item>
      </a-sub-menu>
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
      title: "首页", // 菜单名
      routeName: "home", // 路由名称
      children :[],
    }, // 这是个一级菜单项
    {
      id: 2,
      icon: "icon-yonghu",
      title: "用户管理", // 菜单名
      routeName: "", // 这里路由名称为空，因为点击不会跳转，而是展开它的子菜单
      children :[
        {
          id: 21,
          icon: "icon-user-list",
          title: "用户列表", // 菜单名
          routeName: "user_list", // 路由名称
        },
        {
          id: 22,
          icon: "icon-tianjiayonghu",
          title: "添加用户", // 菜单名
          routeName: "user_create", // 路由名称
        }
      ],
    },

      {
      id: 3,
      icon: "icon-xitongcaidan",
      title: "系统菜单", // 菜单名
      routeName: "", // 这里路由名称为空，因为点击不会跳转，而是展开它的子菜单
      children :[
        {
          id: 31,
          icon: "icon-xitongpeizhi",
          title: "系统配置", // 菜单名
          routeName: "system_config", // 路由名称
        },
      ],
    } // 这是个二级菜单

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

const selectedKeys = ref([

])
import {reactive} from "vue";
const state = reactive({
      selectedKeys: [],
      openKeys: [],
    })
</script>