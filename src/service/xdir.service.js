import { API_BASE_URL } from "../../CONSTATNS";

const commonHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
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


export const updateUserXDIR = async (name, password, email) => {
    try {
        const res = await fetch(`${API_BASE_URL}api/user/update`, {
            method: "PUT",
            headers: commonHeaders,
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        if(!res.ok) throw new Error ("Check credentials")
        return await res.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}


export const logOutXDIR = (email) => {
    
}