import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Customer {
    user: {
        fullName: string;
        email: string;
    };
    phoneNumber: string;
    address: string;
}

export const CustomerDetails: React.FC = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const [customer, updateCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response => response.json())
            .then((data: Customer[]) => {
                const singleCustomer = data[0];
                updateCustomer(singleCustomer);
            });
    }, [customerId]);

    return (
        <section className="customer">
            <header className="customer_header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone Number: {customer?.phoneNumber}</div>
            <div>Address: {customer?.address}</div>
        </section>
    );
};
