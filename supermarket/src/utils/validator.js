/* 工具函数 */ 
// 验证密码 (只能输入4~18个字母、数字、下划线)
export function passwordReg(val) {
    const reg =/^(\w){3,17}$/;
    return reg.test(val)
}
//不推荐使用，因为引入不用解构方式，而且只能写一次
// export default function passwordReg(val) {
//     const reg = /^[a-zA-Z]\w{2,5}$/;
//     return reg.test(val)
// }