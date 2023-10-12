interface SqlVO {
    url: string,
    username?: string,
    password?: string,
    sql: string
}

interface Result<T> {
    code: number,
    msg: string,
    time: number,
    data: T
}

interface DslVO {
    status: number,
    body: JSON
}