import http, { API_V1 } from "../http-common"

const entityName = "login"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiLogin = (authData) => {
    return http.post(`${apiEndPoint}`, authData)
}


export {
    ApiLogin
}

