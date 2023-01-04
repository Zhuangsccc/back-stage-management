import request from '@/utils/request'
export function listRoutes() {
    return request({
      url: '/vue3/getRoutes',
      method: 'get'
    });
  }