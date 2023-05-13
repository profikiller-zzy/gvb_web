import {Ser} from "@/service/service";

// 用户登录接口
export function userLogin(data){
  let res = Ser.post("/api/user_login/", data)
    return res
}

export function userLogoutApi(){
  return Ser.post( "/api/user_logout/", {})
}

export function userRegister(data){
  let res = Ser.post("/api/user_register/", data)
    return res
}

// 用户列表
export function userListApi(params){
  return Ser.get("/api/user_list/", {params})
}

export function bookListApi(params){
  return Ser.get("/api/book_list/", {params})
}

// 用户借书
export function borrowBookApi(bookId){
  return Ser.put(`/api/book_borrow/${bookId}`)
}

// 用户借阅记录
export function myBorrowRecordApi(){
  return Ser.get(`/api/user_borrow_record_list`)
}

// 用户还书
export function returnBookApi(bookId){
  return Ser.post(`/api/book_return/${bookId}`)
}

// 用户续借
export function renewBookApi(bookId){
  return Ser.post(`/api/book_renew/${bookId}`)
}

// 按书名查书
export function queryByBookNameApi(book_name_query){
  return Ser.post( "/api/book_query_book_name/", book_name_query)
}

export function queryByAuthorApi(author_query){
  return Ser.post( "/api/book_query_author/", author_query)
}

export function queryByPressApi(press_query){
  return Ser.post( "/api/book_query_press/", press_query)
}

export function getMyInformationApi(){
  return Ser.get( "/api/user_info/", {})
}

export function updateMyInformationApi(data){
  return Ser.put( "/api/user_update/", data)
}

export function updatePasswordApi(password){
  return Ser.put( "/api/user_update_password/", password)
}

export function adminLogin(data){
  return Ser.post("/api/admin_login/", data)
}

export function removeBookApi(id_list){
  return Ser.delete("/api/book_remove/", {data: id_list})
}

export function createBookApi(data){
  return Ser.put("/api/book_create/", data)
}
export function updateBookApi(bookId, data){
  return Ser.post(`/api/book_update/${bookId}`, data)
}

export function deleteUserApi(userId){
  return Ser.delete(`/api/user_delete/${userId}`)
}
