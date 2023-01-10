import http, { API_V1 } from "../http-common"

const entityName = "contract"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetContract = () => {
    return http.get(`${apiEndPoint}`)
}


export {
    ApiGetContract
}