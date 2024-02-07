interface User {
    id: number;
    fullName: string;
    email: string;
    isStaff: boolean;
}

export const getAllCustomers = (): Promise<User[]> => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(res => res.json());
}

export const getAllUsers = (): Promise<User[]> => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json());
}
