import request from '@/utils/request'
export function listRoutes() {
    return request({
      url: '/vue3/getRoutes',
      method: 'get'
    });
  }
export function addRoutes(route){
  return request({
    url: '/vue3/addRoutes',
      method: 'post',
      data:{
        route,
      }
  })
}
export function updateRoute(data){
  return request({
    url: '/vue3/updateRoute',
      method: 'post',
      data:data
  })
}