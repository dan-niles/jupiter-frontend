import http, { API_V1 } from "../http-common"

const entityName = "paygrade"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetPaygrade = () => {
    return http.get(`${apiEndPoint}`)
}


export {
    ApiGetPaygrade
}