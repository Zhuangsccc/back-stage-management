import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/my/userInfo',
    method: 'get',
  })
}

export function register(data){
  return request({
    url: '/api/regUser',
    method: 'post',
    data
  })
}
export function getUserInfo(name){
  return request({
    url:"/vue3/userInfo",
    method:"post",
    data:{
      username:name
    }
  })
}
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
export function setUser(data){
  return request({
    url:"/api/setUser",
    method:"post",
    data:data
  })
}