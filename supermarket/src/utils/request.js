// 封装axios
//引入axios
import axios from 'axios'

//引入qs
import qs from 'qs'

//设置路径
axios.defaults.baseURL='http://localhost:666'

//导出请求对象
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params
                })
                .then(response => {
                    // 成功使用resolve处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败使用reject处理
                    reject(err)
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    // 成功使用resolve处理
                    resolve(response.data)
                })
                .catch(err => {
                    // 失败使用reject处理
                    reject(err)
                })
        })
    }
}