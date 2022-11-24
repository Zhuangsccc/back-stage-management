import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // data: qs.stringify(data)
    data
  })
}

export function getInfo() {
  return request({
    url: '/my/userInfo',
    method: 'get',
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
