import { useState } from "react";
import Cookies from "js-cookie";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import axios from "axios";
import {
    type SpringError,
    type LoginRes,
    type LoginReq,
} from "../utils/interfaces";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogging, setIsLogging] = useState(false);
    const [error, setError] = useState("");
    const [violations, setViolations] = useState<string[]>();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLogging(true);
        setError("");
        setViolations([]);
        try {
            const req: LoginReq = { email, password };
            const response = await api.post<LoginRes>("/auth/login", req);

            Cookies.set("token", response.data.token, {
                secure: true,
                sameSite: "Strict",
                expires: response.data.expires_in,
            });

            navigate("/");
        } catch (error) {
            if (axios.isAxiosError<SpringError>(error) && error.response) {
                if (error.status === 400) {
                    const errorData: SpringError = error.response.data;
                    if (errorData.violations) {
                        setViolations(errorData.violations);
                    } else {
                        setError(errorData.detail);
                    }
                } else if (error.status === 401) {
                    setError("Invalid credentials");
                } else {
                    setError("Something went wrong...");
                }
            } else {
                setError("Something went wrong...");
            }
        } finally {
            setIsLogging(false);
        }
    };
    return (
        <>
            <TopBar />
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                        Login
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-sm font-medium text-red-600">
                                {error}
                            </p>
                        )}

                        {violations?.map((v) => (
                            <p
                                key={v}
                                className="text-sm font-medium text-red-600"
                            >
                                {v}
                            </p>
                        ))}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />

                        <button
                            type="submit"
                            disabled={isLogging}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLogging ? "Logging in…" : "Login"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        New on this site?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="font-medium text-indigo-600 hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </main>
        </>
    );
}
