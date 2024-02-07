import React, { useState } from "react";
import { TicketList } from "./TicketList";
import { TicketSearch } from "./TicketSearch";

export const TicketContainer: React.FC = () => {
    const [searchTerms, setSearchTerms] = useState<string>("");

    return (
        <>
            <TicketSearch setterFunction={setSearchTerms} />
            <TicketList searchTermState={searchTerms} />
        </>
    );
};
