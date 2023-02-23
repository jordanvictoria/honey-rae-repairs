export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(res => res.json())
}

export const getAllUsers = () => {
    return fetch(`"http://localhost:8088/users"`)
        .then(res => res.json())
}

