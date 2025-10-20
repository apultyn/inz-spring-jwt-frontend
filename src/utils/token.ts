import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import type { DecodedToken } from "./interfaces";

export function decodeToken(): DecodedToken {
    const token = Cookies.get("token");
    if (!token) {
        return {
            iat: 0,
            exp: 0,
            role: "",
            sub: "",
        };
    }
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
}

export function getIsAdmin(): boolean {
    return decodeToken().role === "ADMIN";
}

export function getIsUser(): boolean {
    return decodeToken().role === "USER";
}
