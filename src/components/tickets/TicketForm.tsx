import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Ticket {
    description: string;
    emergency: boolean;
}

export const TicketForm = () => {
    const [ticket, updateTicket] = useState<Ticket>({
        description: "",
        emergency: false
    });

    const navigate = useNavigate();
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = localHoneyUser ? JSON.parse(localHoneyUser) : null;

    const handleSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const ticketToSendToAPI = {
            userId: honeyUserObject?.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        };

        fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/tickets");
        });
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={(evt) => updateTicket({ ...ticket, description: evt.target.value })}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="emergency">Emergency:</label>
                    <input
                        type="checkbox"
                        checked={ticket.emergency}
                        onChange={(evt) => updateTicket({ ...ticket, emergency: evt.target.checked })}
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Submit Ticket
            </button>
        </form>
    );
};
