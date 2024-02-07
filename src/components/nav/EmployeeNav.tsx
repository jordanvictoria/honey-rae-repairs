import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const EmployeeNav: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("honey_user");
        navigate("/", { replace: true });
    };

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("honey_user") &&
                <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={handleLogout}>Logout</Link>
                </li>
            }
        </ul>
    );
};
