import axios from "axios";
const backendUrl = import.meta.env.BACKEND_URL;

export default axios.create({
    baseURL: backendUrl,
    withCredentials: false,
})