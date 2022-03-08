import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { userApi } from "../../hooks/useApi";
import { User } from "../../types/User";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const api = userApi();

    const signin = async (cpf: string, password: string) => {
        const data = await api.singnin(cpf, password);

        if(data.user && data.access_token) {
            setUser(data.user);
            setUseStorage(data.user);
            setToken(data.access_token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
    }

    const setUseStorage = (user : string) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const setToken = (token : string) => {
        localStorage.setItem('authToken', token);
    }

    return(
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}