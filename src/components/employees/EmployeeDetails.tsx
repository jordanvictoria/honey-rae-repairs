import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Employee {
    user: {
        fullName: string;
        email: string;
    };
    specialty: string;
    rate: number;
    employeeTickets: any[]; // Assuming the type of employeeTickets is any[]
}

export const EmployeeDetails: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const [employee, updateEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(response => response.json())
            .then((data: Employee[]) => {
                const singleEmployee = data[0];
                updateEmployee(singleEmployee);
            });
    }, [employeeId]);

    return (
        <section className="employee">
            <header className="employee_header">{employee?.user.fullName}</header>
            <div>Email: {employee?.user.email}</div>
            <div>Specialty: {employee?.specialty}</div>
            <div>Rate: {employee?.rate}</div>
            <footer>Currently working on {employee?.employeeTickets.length} tickets</footer>
        </section>
    );
};
