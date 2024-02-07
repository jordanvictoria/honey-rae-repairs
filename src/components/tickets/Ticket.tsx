import React from "react";
import { Link } from "react-router-dom";

interface TicketProps {
    ticketObject: {
        id: number;
        userId: number;
        description: string;
        emergency: boolean;
        dateCompleted: string;
        employeeTickets: { employeeId: number }[];
    };
    currentUser: {
        id: number;
        staff: boolean;
    };
    employees: {
        id: number;
        userId: number;
        user: { fullName: string };
    }[];
    getAllTickets: () => void;
}

export const Ticket: React.FC<TicketProps> = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    // Find the assigned employee for the current ticket
    let assignedEmployee: { id: number; user: { fullName: string } } | null | undefined = null;



    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0];
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId);
    }

    // Find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id);

    // Function that determines if current user can close the ticket
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "" && currentUser.staff) {
            return <button onClick={closeTicket} className="ticketFinish">Finish</button>;
        } else {
            return null;
        }
    };

    // Function that updates the ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date().toISOString()
        };

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(response => response.json())
        .then(getAllTickets);
    };

    // Function to render claim button for non-staff users
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    fetch(`http://localhost:8088/employeeTickets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            employeeId: userEmployee?.id,
                            serviceTicketId: ticketObject.id
                        })
                    })
                    .then(response => response.json())
                    .then(() => {
                        // Get the state from the API again
                        getAllTickets();
                    });
                }}
            >
                Claim
            </button>;
        } else {
            return null;
        }
    };

    // Function to render delete button for non-staff users
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    getAllTickets();
                });
            }} className="ticketFinish">Delete</button>;
        } else {
            return null;
        }
    };

    return (
        <section className="ticket">
            <header>
                {currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>}
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "Yes" : "No"}</section>
            <footer>
                {ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee ? assignedEmployee.user.fullName : ""}`
                    : buttonOrNoButton()}
                {canClose()}
                {deleteButton()}
            </footer>
        </section>
    );
};
