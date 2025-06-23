import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import axios from "axios";
import type { SpringError } from "../utils/interfaces";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [violations, setViolations] = useState<SpringError["violations"]>();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setViolations(null);
        setIsRegistering(true);
        try {
            const response = await api.post("/auth/register", {
                email,
                password,
                confirmPassword,
            });
            setSuccess(response.data.msg);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (axios.isAxiosError<SpringError>(error) && error.response) {
                if (error.response.data.description) {
                    setError(error.response.data.description);
                }
                if (error.response.data.violations) {
                    setViolations(error.response.data.violations);
                }
            } else {
                setError("Something went wrong...");
            }
        } finally {
            setIsRegistering(false);
        }
    };
    return (
        <>
            <TopBar />

            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                        Register
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {success && (
                            <p className="text-sm font-medium text-green-600">
                                {success}
                            </p>
                        )}
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

                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isRegistering ? "Registering…" : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="font-medium text-indigo-600 hover:underline"
                        >
                            Log&nbsp;in
                        </button>
                    </p>
                </div>
            </main>
        </>
    );
}
