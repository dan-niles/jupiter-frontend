import http, { API_V1 } from "../http-common"

const entityName = "title"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetTitles = () => {
    return http.get(`${apiEndPoint}`)
}


export {
    ApiGetTitles
}