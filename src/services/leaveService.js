import http, { API_V1 } from "../http-common"

const entityName = "leave"
const apiEndPoint = `/${API_V1}/${entityName}`

const ApiGetLeavesOfUser = (user_id) => {
    return http.get(`${apiEndPoint}/${user_id}`)
}

const ApiApplyLeave = (user_id, data) => {
    return http.post(`${apiEndPoint}/${user_id}`, data)
}

const ApiDeletePendingLeave = (emp_id, leave_id) => {
    return http.delete(`${apiEndPoint}/${emp_id}/${leave_id}`,)
}

const ApiGetLeavesToApprove = (supervisor_id) => {
    return http.get(`${apiEndPoint}/supervisor/${supervisor_id}`)
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