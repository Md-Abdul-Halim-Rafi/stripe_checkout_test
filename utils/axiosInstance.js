import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://e93d-103-159-129-110.in.ngrok.io/api/v2",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

export default axiosInstance;