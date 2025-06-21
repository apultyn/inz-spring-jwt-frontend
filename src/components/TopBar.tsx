import { useNavigate } from "react-router-dom"
import { decodeToken } from "../utils/token";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function TopBar() {
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");

    const fetchToken = () => {
        const token = decodeToken();
        setUsername(token.sub);
    }

    const handleLogout = () => {
        Cookies.set("token", "");
        navigate(0);
    }

    useEffect(() => fetchToken(), []);

    return <>
    <h1 onClick={() => navigate("/")}>Book Reviews</h1>
    <div>
        {userName && <p>Hello {userName}</p>}
        {userName ? <button onClick={handleLogout}>Log out</button> : <button onClick={() => navigate("/login")}>Log in</button>}
    </div>
    </>
}