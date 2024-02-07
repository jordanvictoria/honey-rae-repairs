import React from "react";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";
import "./NavBar.css";

export const NavBar: React.FC = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser || "");

    if (honeyUserObject.staff) {
        return <EmployeeNav />;
    } else {
        return <CustomerNav />;
    }
};
