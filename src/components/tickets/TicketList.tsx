import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket } from "./Ticket";
import "./Tickets.css";

interface TicketListProps {
    searchTermState: string;
}

interface TicketData {
    id: number;
    description: string;
    emergency: boolean;
    userId: number;
    dateCompleted: string; // You might want to adjust this type based on your API response
    employeeTickets: any[]; // You might want to adjust this type based on your API response
}

interface EmployeeData {
    id: number;
    userId: number;
    user: {
        fullName: string;
    };
}


export const TicketList: React.FC<TicketListProps> = ({ searchTermState }) => {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [filteredTickets, setFiltered] = useState<TicketData[]>([]);
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [emergency, setEmergency] = useState<boolean>(false);
    const [openOnly, updateOpenOnly] = useState<boolean>(false);
    const navigate = useNavigate();

    const localHoneyUser = localStorage.getItem("honey_user") || '';
    const honeyUserObject = JSON.parse(localHoneyUser);

    useEffect(() => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase());
        });
        setFiltered(searchedTickets);
    }, [searchTermState, tickets]);

    useEffect(() => {
        if (emergency) {
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true);
            setFiltered(emergencyTickets);
        } else {
            setFiltered(tickets);
        }
    }, [emergency, tickets]);

    const getAllTickets = () => {
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
            .then(response => response.json())
            .then((ticketArray: TicketData[]) => {
                setTickets(ticketArray);
            });
    };

    useEffect(() => {
        getAllTickets();

        fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then((employeeArray: EmployeeData[]) => {
                setEmployees(employeeArray);
            });
    }, []);

    useEffect(() => {
        if (honeyUserObject.staff) {
            setFiltered(tickets);
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id);
            setFiltered(myTickets);
        }
    }, [tickets, honeyUserObject]);

    useEffect(() => {
        if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === "";
            });
            setFiltered(openTicketArray);
        } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id);
            setFiltered(myTickets);
        }
    }, [openOnly, tickets, honeyUserObject]);

    return (
        <>
            {honeyUserObject.staff ? (
                <>
                    <button onClick={() => setEmergency(true)}>Emergency Only</button>
                    <button onClick={() => setEmergency(false)}>Show All</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
            )}

            <h2>List of Tickets</h2>

            <article className="tickets">
                {filteredTickets.map(ticket => (
                    <Ticket
                        key={ticket.id}
                        currentUser={honeyUserObject.id}
                        getAllTickets={getAllTickets}
                        employees={employees}
                        ticketObject={ticket}
                    />
                ))}
            </article>
        </>
    );
};
