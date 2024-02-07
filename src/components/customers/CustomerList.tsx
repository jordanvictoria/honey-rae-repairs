import React, { useEffect, useState } from "react";
import { Customer } from "./Customer";
import { getAllCustomers } from "../ApiManager";
import "./Customers.css";

interface CustomerData {
    id: number;
    fullName: string;
}

export const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    useEffect(() => {
        getAllCustomers().then((customerArray: CustomerData[]) => {
            setCustomers(customerArray);
        });
    }, []);

    return (
        <article className="customers">
            {customers.map(customer => (
                <Customer key={`customer--${customer.id}`} id={customer.id} name={customer.fullName} />
            ))}
        </article>
    );
};


