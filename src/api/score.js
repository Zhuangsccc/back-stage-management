import request from '@/utils/request'
//获取成绩列表
export function getScore(pageIndex,pageSize){
    return request({
        url:"/score/getScore",
        method:"get",
        params:{
            pageIndex,
            pageSize
          }
    })
}
//根据名称获取成绩列表
export function getScoreByName(name){
    return request({
        url:"/score/getScoreByName",
        method:"post",
        data:{
            name,
        }
    })
}
//新增成绩
export function addScore(data){
    return request({
        url:"/score/addNewScore",
        method:"post",
        data,
    })
}
//更新成绩
export function updateScore(data){
    return request({
        url:"/score/updateScore",
        method:"post",
        data,
    })
}
export function deleteScore(id){
    return request({
        url:"/score/deleteScore",
        method:"delete",
        data:{
            id
        }
    })
}