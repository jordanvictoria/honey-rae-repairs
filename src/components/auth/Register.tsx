import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface User {
    id: number;
    email: string;
    fullName: string;
    isStaff: boolean;
    [key: string]: any; // Index signature
}

export const Register: React.FC = () => {
    const [customer, setCustomer] = useState<User>({
        id: 0,
        email: "",
        fullName: "",
        isStaff: false
    });
    const navigate = useNavigate();

    const registerNewUser = async () => {
        try {
            const response = await fetch("http://localhost:8088/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customer)
            });
            const createdUser: User = await response.json();

            if (createdUser.id) {
                localStorage.setItem("honey_user", JSON.stringify({
                    id: createdUser.id,
                    staff: createdUser.isStaff
                }));
                navigate("/");
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8088/users?email=${customer.email}`);
            const existingUsers: User[] = await response.json();

            if (existingUsers.length > 0) {
                window.alert("Account with that email address already exists");
            } else {
                registerNewUser();
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }
    };

    const updateCustomer = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...customer };
        copy[evt.target.id] = evt.target.value;
        setCustomer(copy);
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Honey Rae Repairs</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...customer };
                        copy.isStaff = evt.target.checked;
                        setCustomer(copy);
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="isStaff"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
};
