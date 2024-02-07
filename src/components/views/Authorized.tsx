import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthorizedProps {
    children: React.ReactNode;
}

export const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
    const location = useLocation();

    if (localStorage.getItem("honey_user")) {
        return <>{children}</>;
    } else {
        return (
            <Navigate
                to={`/login/${location.search}`}
                replace
                state={{ location }}
            />
        );
    }
};
