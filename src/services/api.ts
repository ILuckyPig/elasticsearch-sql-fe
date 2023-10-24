import { instance } from './http.ts'

export function explain(url: string, sqlVO: SqlVO) {
    const response = new Promise<Result<DslVO>>((resolve, reject) => {
        instance.post(url, sqlVO)
            .then(reslut => {
                resolve(reslut.data)
            })
            .catch(e => {
                reject(e)
            })
    })
    return response
}

export function query(url: string, sqlVO: SqlVO) {
    const response = new Promise<Result<TableVO>>((resolve, reject) => {
        instance.post(url, sqlVO)
            .then(reslut => {
                resolve(reslut.data)
            })
            .catch(e => {
                reject(e)
            })
    })
    return response
}