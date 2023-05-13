import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/",
      name : "",
      component: ()=>import("../app.vue")
    },
    {
      path : "/user_login",
      name : "user_login",
      component: ()=>import("../views/user/login/user_login.vue")
    },
      {
      path : "/user_register",
      name : "user_register",
      component: ()=>import("../views/user/login/user_register.vue")
    },
    {
      path : "/admin_login",
      name : "admin_login",
      component: ()=>import("../views/admin/login/admin_login.vue")
    },
    {
      path : "/user",
      name : "user",
      component: ()=>import("../views/user/user.vue"),
        children : [
          {
            path : "",
            name : "user_index",
            redirect : "/user/home",
          },
          {
            path : "home",
            name : "home",
            component: ()=>import("../views/user/home/home.vue"),
          },
          {
            path : "book_list",
            name : "book_list",
            component: ()=>import("../views/user/book/book_list.vue"),
          },
          {
            path : "my_borrow_record",
            name : "my_borrow_record",
            component: ()=>import("../views/user/book/my_borrow_record.vue"),
          },
        ]
    },
    {
      path : "/admin",
      name : "admin",
      component: ()=>import("../views/admin/admin.vue"),
      children: [
          {
            path : "",
            name : "admin_index",
            redirect : "/admin/user_list",
          },
          {
            path : "user_list",
            name : "user_list",
            component: ()=>import("../views/admin/home/user_list.vue"),
          },
          {
            path : "admin_book_list",
            name : "admin_book_list",
            component: ()=>import("../views/admin/home/admin_book_list.vue"),
          },
      ]
    }
  ]
})

export default router
