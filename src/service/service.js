import axios from "axios";
import {useGlobalStore} from "@/stores/global_store";

// 创建axios实例
export const Ser = axios.create({
    timeout: 7000,
    baseURL: "",
    headers: {
        "Content-Type" : "application/json",
    }
    }
)

// 定义了一个request拦截器，拦截所有的请求，主要用于在header中添加token
Ser.interceptors.request.use(request => {
    const store = useGlobalStore()
    request.headers["token"] = store.userInfo.token
    request.headers["admin_token"] = store.adminInfo.token
    return request
})

Ser.interceptors.response.use(response => {
    return response.data
})