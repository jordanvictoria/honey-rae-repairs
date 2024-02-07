import React, { useEffect, useState } from "react";

interface Profile {
    id: number;
    specialty: string;
    rate: number;
    userId: number;
}

export const EmployeeForm: React.FC = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = localHoneyUser ? JSON.parse(localHoneyUser) : null;

    const [profile, updateProfile] = useState<Profile>({
        id: 0,
        specialty: "",
        rate: 0,
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
            fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
                .then(response => response.json())
                .then((data: Profile[]) => {
                    const employeeObj = data[0];
                    if (employeeObj) {
                        updateProfile(employeeObj);
                    }
                });
        }
    }, [honeyUserObject]);

    const handleSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(response => response.json())
        .then(() => {
            setFeedback("Employee profile successfully saved");
        });
    };

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>

            <form className="profile">
                <h2 className="profile__title">Employee Info</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={(evt) => updateProfile({ ...profile, specialty: evt.target.value })}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="rate">Hourly rate:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={(evt) => updateProfile({ ...profile, rate: parseFloat(evt.target.value) })}
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
