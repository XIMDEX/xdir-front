import { API_BASE_URL, COOKIE_NAME } from "../../CONSTATNS";

const getToken = () =>{
  return JSON.parse(localStorage?.getItem(`${COOKIE_NAME}`) ?? '{}')?.access_token
}
const commonHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: getToken()
};

export const loginXDIR = async (email, password) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/login`, {
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if(!res.ok) throw new Error ("Check your credentials and try again later.")
        const json = await res.json()
        return json;
    } catch (err) {
        return { error: "Check your credentials and try again later." };
    }
};


export const registerXDIR = async (user) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/register`, {
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify(user),
        });
        if(!res.ok) throw new Error (res.error.messagge ?? 'Check your information and try again later.')
        const json = await res.json()
        return json;
    } catch (err) {
        console.error(err);
        return err;
    }
};


export const updateUserXDIR = async ({ name, surname, email, birthdate }) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/user/update`, {
            method: "PUT",
            headers: commonHeaders,
            body: JSON.stringify({
                name,
                email,
                surname,
                birthdate
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to update user information. Please try again later.");
        }
        return await res.json();
    } catch (err) {
        return { error: "Failed to update user information. Please check try again later." };
    }
}


export const getRoles = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}api/roles`, {
            method: "GET",
            headers: commonHeaders,
        });
        if (!res.ok) {
            throw new Error("Failed to fetch roles. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to fetch roles. Please try again later." };
    }
}


export const  createNewRole = async ({name}) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/create`, {
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify({
                name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to create new role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to create new role. Please try again later." };
    }
}


export const updateExistingRole = async (id, name) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/update/${id}`, {
            method: "PUT",
            headers: commonHeaders,
            body: JSON.stringify({
                name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to update this role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to update this role. Please try again later." };
    }
}


export const deleteExistingRole = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/delete/${id}`, {
            method: "DELETE",
            headers: commonHeaders,
        });
        if (!res.ok) {
            throw new Error("Failed to delete this role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this role. Please try again later." };
    }
}