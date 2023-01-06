import axios from "axios"

const BASE_URL = process.env.REACT_APP_BACKEND_URL
export const API_V1 = "api"

export default axios.create({
    baseURL: BASE_URL
})