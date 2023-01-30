import request from "@/utils/request"
export function getMessageBoard(pageIndex,pageSize){
    return request({
        url:"/vue3/getMessageBoard",
        method:"post",
        data:{
            pageIndex,
            pageSize
        }
    })
}
//删除操作
export function deleteMessageBoard(id){
    return request({
        url:"/vue3/deleteMessageBoard",
        method:"delete",
        data:{
            id
        }
    })
}
//回复操作
export function updateMessageBoard(data){
    return request({
        url:"/vue3/updateMessageBoard",
        method:"post",
        data,
    })
}