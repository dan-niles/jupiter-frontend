import http, { API_V1 } from "../http-common"

const entityName = "department"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetAllDepartments = () => {
    return http.get(`${apiEndPoint}/`)
}

export {
    ApiGetAllDepartments
}