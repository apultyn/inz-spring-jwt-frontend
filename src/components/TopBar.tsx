import { useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/token";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function TopBar() {
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");

    const handleLogout = () => {
        Cookies.set("token", "");
        navigate(0);
    };

    useEffect(() => {
        const token = decodeToken();
        setUsername(token.sub);
    }, []);

    return (
        <header className="sticky top-0 z-10 bg-indigo-600 text-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <button
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold tracking-wide transition-opacity hover:opacity-80"
                >
                    Book&nbsp;Reviews
                </button>

                <div className="flex items-center gap-4">
                    {userName && (
                        <p className="hidden sm:block">Hello&nbsp;{userName}</p>
                    )}

                    {userName ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
                        >
                            Log&nbsp;out
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                        >
                            Log&nbsp;in
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
