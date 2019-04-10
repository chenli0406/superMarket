/* 所有关于账号部分接口的请求处理 都封装在这个文件中 */ 

//引入request.js
import request from '../utils/request';

//添加账号
export function addAccount(url,params){
    return new Promise((resolve,reject)=>{
        request.post(url,params)
        .then(res =>{
            // 成功的数据
            resolve(res)
        })
        .catch(err =>{
            // 错误信息
            reject(err)
        })
    })
}