import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Ticket {
    id: number;
    description: string;
    emergency: boolean;
}

export const TicketEdit = () => {
    const [ticket, setTicket] = useState<Ticket>({
        id: 0,
        description: "",
        emergency: false
    });
    const { ticketId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data: Ticket) => {
                setTicket(data);
            });
    }, [ticketId]);

    const handleSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/tickets");
        });
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={ticket.description}
                        onChange={(evt) => setTicket({ ...ticket, description: evt.target.value })}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="emergency">Emergency:</label>
                    <input
                        type="checkbox"
                        checked={ticket.emergency}
                        onChange={(evt) => setTicket({ ...ticket, emergency: evt.target.checked })}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Save Edits
            </button>
        </form>
    );
};
