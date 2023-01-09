import http, { API_V1 } from "../http-common"

const entityName = "status"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetStatus = () => {
    return http.get(`${apiEndPoint}`)
}


export {
    ApiGetStatus
}