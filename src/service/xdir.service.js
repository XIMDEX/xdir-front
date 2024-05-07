import { API_BASE_URL } from "../../CONSTATNS";

export const loginXDIR = (email, password) => {
    try {
        return fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })  
        .then(res => res.json())
        .catch((err) => { console.error(err); return false;});
    } catch (e) {
        console.error(e);
        return false;
    }
}


export const logOutXDIR = (email) => {
    
}