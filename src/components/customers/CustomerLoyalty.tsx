import React from "react";
import { Link } from "react-router-dom";

interface CustomerLoyaltyProps {
    id: number;
    name: string;
}

export const CustomerLoyalty: React.FC<CustomerLoyaltyProps> = ({ id, name }) => {
    return (
        <section className="customer">
            <div>
                <Link to={`/customers/${id}`}>Name: {name}</Link>
            </div>
        </section>
    );
};
