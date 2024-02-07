import React, { useEffect, useState } from "react";

interface Profile {
    id: number;
    address: string;
    phoneNumber: string;
    userId: number;
}

export const CustomerForm: React.FC = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = localHoneyUser ? JSON.parse(localHoneyUser) : null;

    const [profile, updateProfile] = useState<Profile>({
        id: 0,
        address: "",
        phoneNumber: "",
        userId: 0
    });

    const [feedback, setFeedback] = useState<string>("");

    useEffect(() => {
        if (feedback !== "") {
            const timeoutId = setTimeout(() => setFeedback(""), 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [feedback]);

    useEffect(() => {
        if (honeyUserObject) {
            fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
                .then(response => response.json())
                .then((data: Profile[]) => {
                    const customerObj = data[0];
                    if (customerObj) {
                        updateProfile(customerObj);
                    }
                });
        }
    }, [honeyUserObject]);

    const handleSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(response => response.json())
        .then(() => {
            setFeedback("Customer profile successfully saved");
        });
    };

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>

            <form className="profile">
                <h2 className="profile__title">Customer Info</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={(evt) => updateProfile({ ...profile, address: evt.target.value })}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={(evt) => updateProfile({ ...profile, phoneNumber: evt.target.value })}
                        />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    );
};
