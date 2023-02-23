import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import { getAllCustomers } from "../ApiManager"
import "./Customers.css"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getAllCustomers()
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => < Customer key={`customer--${customer.id}`}
                id={customer.id}
                name={customer.fullName} />)
        }
    </article>
}


