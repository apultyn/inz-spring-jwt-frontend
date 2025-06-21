import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface DecodedToken {
    exp: number;
    iat: number;
    sub: string;
}

export function decodeToken() {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded;
    }
    return {
        exp: 0,
        iat: 0,
        sub: "",
    };
}
