import request from '@/utils/request'
//获取成绩列表
export function getScore(){
    return request({
        url:"/score/getScore",
        method:"get"
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