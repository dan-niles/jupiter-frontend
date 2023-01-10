import http, { API_V1 } from "../http-common"

const entityName = "leave"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetLeavesOfUser = () => {
    return http.get(`${apiEndPoint}/`)
}

const ApiApplyLeave = (data) => {
    return http.post(`${apiEndPoint}/`, data)
}

const ApiDeletePendingLeave = (leave_id) => {
    return http.delete(`${apiEndPoint}/${leave_id}`)
}

const ApiGetLeavesToApprove = () => {
    return http.get(`${apiEndPoint}/supervisor`)
}

const ApiTakeLeaveAction = (data) => {
    return http.post(`${apiEndPoint}/supervisor`, data)
}

export {
    ApiGetLeavesOfUser,
    ApiDeletePendingLeave,
    ApiGetLeavesToApprove,
    ApiTakeLeaveAction,
    ApiApplyLeave
}