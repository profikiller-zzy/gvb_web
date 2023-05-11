import {message} from "ant-design-vue";
import {Ser} from "@/service/service";

// 用户登录接口
export function emailLoginApi(data){
  let res = Ser.post("/api/email_login/", data)
    return res
}

// 用户列表
export function userListApi(query){
  return Ser.get("/api/user_list/", query)
}