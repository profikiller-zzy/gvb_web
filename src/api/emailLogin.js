import {message} from "ant-design-vue";
import {Ser} from "@/service/service";

export function emailLoginApi(data){
  let res = Ser.post("api/email_login/", data)
    return res
}