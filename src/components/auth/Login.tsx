import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface User {
    id: number;
    isStaff: boolean;
}

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("hpassfield7@netvibes.com");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8088/users?email=${email}`);
            const foundUsers: User[] = await response.json();

            if (foundUsers.length === 1) {
                const user = foundUsers[0];
                localStorage.setItem("honey_user", JSON.stringify({
                    id: user.id,
                    staff: user.isStaff
                }));

                navigate("/");
            } else {
                window.alert("Invalid login");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
        }
    };

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    );
};

