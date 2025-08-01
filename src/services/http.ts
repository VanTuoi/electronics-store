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
    const storedData = localStorage.getItem("token");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const token = parsedData.token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { privateApi, publicApi };
