import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 5000,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
})

// export function get(url: string, params: AxiosRequestConfig) {
//     return new Promise((resolve, reject) => {
//         instance.get(url, { params: params })
//             .then(reslut => {
//                 resolve(reslut.data)
//             })
//             .catch(e => {
//                 reject(e)
//             })
//     })
// }

// export function post(url: string, data: SqlVO) {
//     return new Promise((resolve, reject) => {
//         instance.post(url, data)
//             .then(reslut => {
//                 resolve(reslut.data)
//             })
//             .catch(e => {
//                 reject(e)
//             })
//     })
// }

export {
    instance
} 