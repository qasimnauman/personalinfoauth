import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1`, // use your API base URL
});

// Interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
