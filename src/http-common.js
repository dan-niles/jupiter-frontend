import axios from "axios"

const BASE_URL = window.configs.backendUrl
export const API_V1 = "api"

export default axios.create({
    baseURL: BASE_URL
})