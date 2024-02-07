import React, { useEffect, useState } from "react";
import { Employee } from "./Employee";
import "./Employees.css";

interface EmployeeData {
    id: number;
    fullName: string;
    email: string;
}

export const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeData[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray: EmployeeData[]) => {
                setEmployees(employeeArray);
            });
    }, []);

    return (
        <article className="employees">
            {employees.map(employee => (
                <Employee
                    key={`employee--${employee.id}`}
                    id={employee.id}
                    fullName={employee.fullName}
                    email={employee.email}
                />
            ))}
        </article>
    );
};
