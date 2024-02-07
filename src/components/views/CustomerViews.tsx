import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import React, { ReactElement } from "react"

export const CustomerViews: React.FC = () => {
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
                <Route path="tickets" element={<TicketList searchTermState="" />} />
                <Route path="tickets/:ticketId/edit" element={<TicketEdit />} />
                <Route path="ticket/create" element={<TicketForm />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}
