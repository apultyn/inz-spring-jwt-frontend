import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import type { DecodedToken, ReceivedToken } from "./interfaces";

export function decodeToken(): DecodedToken {
    const token = Cookies.get("token");
    if (!token) {
        return { exp: 0, iat: 0, sub: "", roles: [] };
    }
    const decoded = jwtDecode<ReceivedToken>(token);
    const normalized: DecodedToken = {
        ...decoded,
        roles: decoded.roles.map((r) => r.name),
    };
    return normalized;
}
