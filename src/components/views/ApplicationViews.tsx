import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";
import React from "react"

interface User {
    staff: boolean;
}

export const ApplicationViews: React.FC = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject: User = localHoneyUser ? JSON.parse(localHoneyUser) : { staff: false };

    return honeyUserObject.staff ? <EmployeeViews /> : <CustomerViews />;
};
