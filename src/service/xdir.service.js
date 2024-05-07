import { API_BASE_URL } from "../../CONSTATNS";

export const loginXDIR = (email, password) => {
    try {
        return fetch(`${API_BASE_URL}api/login`, {
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
        .catch((err) => { 
            console.error(err)
            return {error: "Check your credentials and try again later."}
        });
    } catch (e) {
        console.error(e);
        return {error: "Check your credentials and try again later."};
    }
}

export const registerXDIR = (user) => {
        return fetch(`${API_BASE_URL}api/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })  
        .then(res => res.json())
        .catch((err) => { 
            console.error(err); 
            return err
        });

}


export const logOutXDIR = (email) => {
    
}