import request from '@/utils/request'
export function getTodoList(pageIndex,pageSize){
    return request({
        url:"/todo/getTodoList",
        method:"get",
        params:{
            pageIndex,
            pageSize
          }
    })
}
export function addTodo(data){
    if(!data.id){
        return request({
            url:"/todo/addTodo",
            method:"post",
            data,
        })
    }else{
        return request({
            url:"/todo/updateTodo",
            method:"post",
            data
        })
    }
}
export function deleteTodo(id){
    return request({
        url:"/todo/deleteTodo",
        method:"delete",
        data:{
            id
        }
    })
}