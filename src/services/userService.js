import http, { API_V1 } from "../http-common"

const entityName = "user"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetAllUsers = () => {
    return http.get(`${apiEndPoint}`)
}

const ApiGetUserById = (userId) => {
    return http.get(`${apiEndPoint}/${userId}`)
}

const ApiCreateNewUser = (userData) => {
    return http.post(`${apiEndPoint}`)
}

const ApiEditUser = (userId, userData) => {
    return http.put(`${apiEndPoint}/${userId}`, userData)
}

const ApiDeleteUser = (userId) => {
    return http.delete(`${apiEndPoint}/${userId}`)
}


export {
    ApiLogin
}

