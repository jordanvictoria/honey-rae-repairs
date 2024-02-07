import React from "react";
import { Link } from "react-router-dom";

interface CustomerProps {
    id: number;
    name: string;
}

export const Customer: React.FC<CustomerProps> = ({ id, name }) => {
    return (
        <section className="customer">
            <div>
                <Link to={`/customers/${id}`}>Name: {name}</Link>
            </div>
        </section>
    );
};
