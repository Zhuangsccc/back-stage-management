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
    return request({
        url:"/todo/addTodo",
        method:"post",
        data,
    })
}