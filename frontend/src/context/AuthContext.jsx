import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // On Mount check if user is logged in or not by accessing /user/me
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axiosInstance.get("/user/me", { _retry: true });
                setUser(response.data.data);
            } catch (err) {
                setUser(null);
            } finally {
                setCheckingAuth(false);
            }
        }

        fetchUser();
    }, []);

    function login(userData) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}