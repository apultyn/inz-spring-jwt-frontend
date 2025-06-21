import { useState } from "react";
import Cookies from "js-cookie";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogging, setIsLogging] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLogging(true);
        try {
            const response = await api.post("/auth/login", {email, password});

            Cookies.set("token", response.data.token, {
                secure: true,
                sameSite: "Strict",
                expires: response.data.expiresIn
            });

            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLogging(false);
        }

    }
    return <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" disabled={isLogging}>{isLogging ? "Logging in..." : "Login"}</button>
        </form>
    </div>
}