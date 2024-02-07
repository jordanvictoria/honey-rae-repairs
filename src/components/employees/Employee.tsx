import React from "react";
import { Link } from "react-router-dom";

interface EmployeeProps {
    id: number;
    fullName: string;
    email: string;
}

export const Employee: React.FC<EmployeeProps> = ({ id, fullName, email }) => {
    return (
        <section className="employee">
            <div>
                <Link to={`/employees/${id}`}>Name: {fullName}</Link>
            </div>
            <div>Email: {email}</div>
        </section>
    );
};
