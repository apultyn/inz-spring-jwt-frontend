import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        const url = config.url ?? "";
        if (
            token &&
            !url.includes("/auth/login") &&
            !url.includes("/auth/register")
        ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest =
            error.config &&
            error.config.method === "post" &&
            error.config.url &&
            error.config.url.includes("/auth/login");

        if (
            error.response &&
            error.response.status === 401 &&
            !isLoginRequest
        ) {
            console.warn("Unauthorized, redirecting to login");
            Cookies.set("token", "");
            window.location.href = "/login";
        } else if (error.response && error.response.status === 403) {
            console.warn("Insufficient permissions");
        } else {
            console.error("Response error: ", error);
        }
        return Promise.reject(error);
    }
);

export default api;
