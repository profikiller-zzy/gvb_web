import { defineStore } from 'pinia'
import { message } from 'ant-design-vue';
import router from "@/router";

const data = {
  token: "",
  avatar: "",
  exp: 1683726766,
  nick_name: "",
  user_id: 0,
}
export const useGlobalStore = defineStore('gvb', {
  state:()=>{
    return {
      Theme : true, // true 白天 false 黑夜
      userInfo: {
        token: "",
        avatar: "",
        exp: 1683726766,
        nick_name: "",
        user_id: 0,
      },
      adminInfo: {
        token: "",
        admin_id: 0,
      }
    }
  },
  actions:{
    // 切换主题
    switchTheme(){
      this.Theme = !this.Theme
      if (this.Theme){
        // 白天
        document.documentElement.classList.remove("dark-theme")
        localStorage.setItem("theme", "light")
      } else {
        // 黑夜
        document.documentElement.classList.add("dark-theme")
        localStorage.setItem("theme", "dark")
      }
    },
    // 加载主题
    loadTheme(){
      const theme = localStorage.getItem("theme")
      if (theme === "dark"){
        this.Theme = false
        document.documentElement.classList.add("dark-theme")
      } else {
        this.Theme = true
      }
    },
    setToken(tokenStr){
      localStorage.setItem("token", tokenStr)
    },
    setUserInfo(info) {
      // 将用户信息存储在本地
      this.$patch({
        userInfo : info,
      })
      // 持久化
      localStorage.setItem("userInfo", JSON.stringify(info))
    },
    setAdminInfo(info) {
      // 将用户信息存储在本地
      this.$patch({
        adminInfo : info,
      })
      // 持久化
      localStorage.setItem("adminInfo", JSON.stringify(info))
    },
    // 加载userInfo，主要是判断登录状态有没有过期
    loadUserInfo() {
      let info = localStorage.getItem("userInfo")
      if (info === null){
        return
      }
      // JSON解析
      let userInfo = JSON.parse(info)
      // 判断时间是否过期(后端传过来的时间以秒为单位，而前端以毫秒为单位，所以要乘1000)
      let exp = userInfo.exp * 1000
      let now = new Date().getTime()
      if ( (exp - now) < 0) {
        // 过期了
        return true;
      }
      this.setUserInfo(userInfo)
      return false
    },
    loadAdminInfo() {
      let info = localStorage.getItem("adminInfo")
      if (info === null){
        return
      }
      // JSON解析
      let adminInfo = JSON.parse(info)
      // 判断时间是否过期(后端传过来的时间以秒为单位，而前端以毫秒为单位，所以要乘1000)
      let adminExp = adminInfo.exp * 1000
      let now = new Date().getTime()
      if ( (adminExp - now) < 0) {
        // 过期了
        return true;
      }
      this.setAdminInfo(adminInfo)
      return false
    }
  }
})