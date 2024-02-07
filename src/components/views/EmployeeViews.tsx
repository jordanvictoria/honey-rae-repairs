import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { CustomerList } from "../customers/CustomerList"
import { TicketContainer } from "../tickets/TicketContainer"
import { CustomerDetails } from "../customers/CustomerDetails"
import { Profile } from "../profile/Profile"
import React, { ReactElement } from "react"

export const EmployeeViews: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <h1>Honey Rae Repair Shop</h1>
                        <div>Your one-stop-shop to get all your electronics fixed</div>

                        <Outlet />
                    </>
                }
            >
                <Route path="profile" element={<Profile />} />
                <Route path="tickets" element={<TicketContainer />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />
            </Route>
        </Routes>
    )
}
