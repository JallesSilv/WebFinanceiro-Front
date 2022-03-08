import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Login } from "../../pages/login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children : JSX.Element }) => {
    const user = localStorage.getItem("user.nome");
    const auth = useContext(AuthContext);
    
    console.log('Req1');
    console.log(auth.user);
    console.log(user);
    if(!auth.user){
        console.log('Req2');
        console.log(auth.user);
        return <Link to="/login" component={Login}>Sobre</Link>;
    }

    return children;
}