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
        url:"/finance/addFinance",
        method:"post",
        data,
    })
}
export function updateFinace(data){
    return request({
        url:"/finance/updateFinance",
        method:"post",
        data,
    })
}
export function deleteFinance(id){
    return request({
        url:"/finance/deleteFinance",
        method:"delete",
        data:{
            id
        }
    })
}
//获取财务收费
export function getFinancialCharges(pageIndex,pageSize){
    return request({
        url:"/finance/getFinancialCharges",
        method:"get",
        params:{
            pageIndex,
            pageSize
        }
    })
}
export function addNewCharges(data){
    return request ({
        url:"/finance/addNewCharges",
        method:"post",
        data
    })
}