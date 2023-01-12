import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }
//获取学生信息列表
export function getStuList(pageIndex,pageSize){
  return request({
    url:"/vue3/getStuInfo",
    method: 'get',
    params:{
      pageIndex,
      pageSize
    }
  })
}
//添加学生列表或修改
export function addStuInfo(data){
  if(data.id){
    return request({
      url:"/vue3/updateStuInfo",
      method:"post",
      data:data
    })
  }else{
    return request({
      url:"/vue3/addStuInfo",
      method:"post",
      data:data
    })
  }
}
//删除学生信息
export function deleteStuInfo(id){
  return request({
    url:"/vue3/deleteStuInfo",
    method:"delete",
    data:{
      id,
    }
  })
}