import http, { API_V1 } from "../http-common"

const entityName = "employee"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetAllEmployee = () => {
    return http.get(`${apiEndPoint}`)
}

const ApiGetEmployeeById = (emp_id) => {
    return http.get(`${apiEndPoint}/${emp_id}`)
}

const ApiDeleteEmployee = (emp_id) => {
    return http.delete(`${apiEndPoint}/${emp_id}`)
}

export {
    ApiGetAllEmployee,
    ApiGetEmployeeById,
    ApiDeleteEmployee
}