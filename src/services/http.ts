import axios from "axios";

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

privateApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export { privateApi, publicApi };
