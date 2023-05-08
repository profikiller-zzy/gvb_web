import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/login",
      name : "login",
      component: ()=>import("../views/login.vue")
    },
    {
      path : "/admin",
      name : "admin",
      component: ()=>import("../views/admin/admin.vue"),
        children : [
          {
            path : "",
            name : "admin_index",
            redirect : "/admin/home",
          },
          {
            path : "home",
            name : "home",
            component: ()=>import("../views/admin/home/home.vue"),
          },
          {
            path : "users",
            name : "users",
            component: ()=>import("../views/admin/user_management/user_list.vue"),
          },
          {
            path : "system_config",
            name : "system_config",
            component: ()=>import("../views/admin/system_management/system_config.vue"),
          }
        ]
    }
  ]
})

export default router
