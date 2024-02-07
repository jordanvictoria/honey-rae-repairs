import React from "react";
import { CustomerForm } from "./CustomerForm";
import { EmployeeForm } from "./EmployeeForm";

interface User {
    staff: boolean;
}

export const Profile: React.FC = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject: User = localHoneyUser ? JSON.parse(localHoneyUser) : { staff: false };

    return honeyUserObject.staff ? <EmployeeForm /> : <CustomerForm />;
};
