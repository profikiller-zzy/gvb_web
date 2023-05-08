import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('gvb', {
  state:()=>{
    return {
      Theme : true
    }
  },
  actions:{
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
    loadTheme(){
      const theme = localStorage.getItem("theme")
      if (theme === "dark"){
        this.Theme = false
        document.documentElement.classList.add("dark-theme")
      } else {
        this.Theme = true
      }
    }
  }
})