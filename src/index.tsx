import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Repairs } from "./components/Repairs";
import "./index.css";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Repairs />
        </BrowserRouter>
    );
} else {
    console.error("Root container not found.");
}
