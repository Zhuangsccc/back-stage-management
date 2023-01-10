import request from '@/utils/request'
export function listRoutes() {
  return request({
    url: '/vue3/getRoutes',
    method: 'get'
  });
}
export function addRoutes(route) {
  return request({
    url: '/vue3/addRoutes',
    method: 'post',
    data: {
      route,
    }
  })
}
export function updateRoute(data) {
  return request({
    url: '/vue3/updateRoute',
    method: 'post',
    data: data
  })
}
export function deleteRoute(id) {
  return request({
    url: '/vue3/deleteRoute',
    method: 'delete',
    data: {
      id,
    }
  })
}
export function setIdRoute(route, id) {
  return request({
    url: "/vue3/setIdRoute",
    method: "post",
    data: {
      route,
      id
    }
  })
}