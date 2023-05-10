import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default ({mode}) =>{
  const env = loadEnv(mode, process.cwd())
  const baseUrl = env.VITE_API
  return defineConfig({
  // 以“VITE_”为前缀的代理才走这个配置
  envPrefix:["VITE_"],
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy:{
      "/uploads":{
        target: baseUrl,
      },
      "/api":{
        target: baseUrl,
      },
    }
  }
})
}
