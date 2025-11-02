import axios from "axios";
import Cookies from "js-cookie";

declare global {
    interface Window {
        env: {
            API_BASE_URL: string;
        };
    }
}

const API_BASE_URL = window.env.API_BASE_URL;

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
            Cookies.set("token", "");
            window.location.href = "/login";
        } else if (
            error.response &&
            error.response.status === 403 &&
            error.response.data.description !== "Data integrity violated"
        ) {
            window.location.href = "/";
        } else {
            console.error("Response error: ", error);
        }
        return Promise.reject(error);
    }
);

export default api;
