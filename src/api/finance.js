import request from '@/utils/request'
export function getList(pageIndex,pageSize){
    return request({
        url:"/finance/getList",
        method:"get",
        params:{
            pageIndex,
            pageSize
          }
    })
}
export function getApprovalList(pageIndex,pageSize){
    return request({
        url:"/finance/getApprovalList",
        method:"get",
        params:{
            pageIndex,
            pageSize
        }
    })
}
//新增财务信息
export function addNewFinance(data){
    return request({
        url:"/finance/addNewFinance",
        method:"post",
        data,
    })
}