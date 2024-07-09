import { API_BASE_URL, COOKIE_NAME } from "../../CONSTATNS";

const getToken = () =>{
  return JSON.parse(localStorage?.getItem(`${COOKIE_NAME}`) ?? '{}')?.access_token
}
const commonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

export const loginXDIR = async (email, password) => {
    try {
        const res = await fetch(`${API_BASE_URL}login`, {
            method: "POST",
            headers: {...commonHeaders},
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
        const res = await fetch(`${API_BASE_URL}register`, {
            method: "POST",
            headers: {...commonHeaders},
            body: JSON.stringify(user),
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Check your information and try again later.');
        }

        return await res.json();
    } catch (err) {
        return { error: err };
    }
};

export const verifyEmailCode = async (action, code) => {
    try {
        const res = await fetch(`${API_BASE_URL}email/verify/${code}`, {
            method: "GET",
            headers: {...commonHeaders},
        });
        
        if (!res.ok) throw new Error('An error occurred while sending the email verification request.');

        return await res.json();
    } catch (err) {
        return { error: err.message }; 
    }
};

export const verifyEmailSendCode = async (email) => {
    try {
        const res = await fetch(`${API_BASE_URL}password/email`, {
            method: "POST",
            headers: {
                ...commonHeaders,
            },
            body: JSON.stringify({email: email})
        });
        if (!res.ok) throw new Error("Failed while verifying your email. Please try again later.");
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "unable to verify your email. Please try again later." };
    }
};

export const verifyChangePassowordCode = async (passwordData) => {
    try {
        const res = await fetch(`${API_BASE_URL}password/reset`, {
            method: "POST",
            headers: {
                ...commonHeaders,
            },
            body: JSON.stringify(passwordData)
        });
        if (!res.ok) throw new Error("Failed to get verify your email code. Please try again later.");
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get verify your email code. Please try again later." };
    }
};

export const changePassword = async (password) => {
    try {
        const res = await fetch(`${API_BASE_URL}password/reset`, {
            method: "GET",
            headers: {
                ...commonHeaders,
            },
            body: JSON.stringify({password: password})
        });
        if (!res.ok) throw new Error("Failed to get new code. Please try again later.");
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get new code. Please try again later." };
    }
};

export const updateUserXDIR = async (user, userID) => {
    try {
        const res = await fetch(`${API_BASE_URL}users/${userID}`, {
            method: "PUT",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(user),
        });
        if (!res.ok) {
            throw new Error("Failed to update user information. Please try again later.");
        }
        return await res.json();
    } catch (err) {
        return { error: "Failed to update user information. Please check try again later." };
    }
};

export const createNewPermission = async (name) => {
    try {
        const res = await fetch(`${API_BASE_URL}permissions`, {
            method: "POST",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to create new Permission. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to create new Permission. Please try again later." };
    }
};

export const getPermissisions = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}permissions`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get permissions. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get permissions. Please try again later." };
    }
};

export const updateExistingPermission = async (id, name) => {
    try {
        const res = await fetch(`${API_BASE_URL}permissions/${id}`, {
            method: "PUT",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to update this permission. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to update this permission. Please try again later." };
    }
};

export const deleteExistingPermission = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}permissions/${id}`, {
            method: "DELETE",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete this permission. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this permission. Please try again later." };
    }
};

export const getRoles = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}roles`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get roles. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get roles. Please try again later." };
    }
};

export const getRole = async (roleID) => {
    try {
        const res = await fetch(`${API_BASE_URL}roles/${roleID}`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get the role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get the role. Please try again later." };
    }
};


export const  createNewRole = async (name) => {
    try {
        const res = await fetch(`${API_BASE_URL}roles`, {
            method: "POST",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
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
};

export const updateExistingRole = async (id, name) => {
    try {
        const res = await fetch(`${API_BASE_URL}roles/${id}`, {
            method: "PUT",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
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
};

export const deleteExistingRole = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}roles/${id}`, {
            method: "DELETE",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete this role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this role. Please try again later." };
    }
};

export const assignPermissionToRole = async (id, permission) => {
    try {
        const res = await fetch(`${API_BASE_URL}role/assign/permission/${id}`, {
            method: "PUT",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                permission: permission
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to assign this permission. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to assign this permission. Please try again later." };
    }
}

export const getOrganizations = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get organizations. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get organizations. Please try again later." };
    }
}

export const createNewOrganization = async (name) => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations`, {
            method: "POST",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to create new organization. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to create new organization. Please try again later." };
    }
}

export const updateExistingOrganization = async (id, name) => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations/${id}`, {
            method: "PUT",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                name: name
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to update this organization. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to update this organization. Please try again later." };
    }
}

export const deleteExistingOrganization = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations/${id}`, {
            method: "DELETE",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete this organization. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this organization. Please try again later." };
    }
}

export const getUsers = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}users`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) throw new Error("Failed to get users. Please try again later.");
        
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get users. Please try again later." };
    }
}

export const getUser = async (userID) => {
    try {
        const res = await fetch(`${API_BASE_URL}users/${userID}`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get the user. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get the user. Please try again later." };
    }
}

export const deleteExistingUser = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}users/${id}`, {
            method: "DELETE",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete this account. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this account. Please try again later." };
    }

}

export const assignRoleToUser = async (newRoles) => {
    try {
        const res = await fetch(`${API_BASE_URL}roles/assign`, {
            method: "POST",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(newRoles),
        });
        if (!res.ok) {
            throw new Error("Failed to set up new Role. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to set up new role. Please try again later." };
    }
}

export const createUserOnService = async (userID, serviceID) => {
    try {
        const res = await fetch(`${API_BASE_URL}services/create-user-on-service/${userID}/${serviceID}`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (!res.ok) {
            throw new Error("Failed to create user on service. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        console.error("Error creating user on service:", err);
        throw err;  // Re-lanza el error para que pueda ser manejado por el bloque catch en saveButton
    }
}


export const sendRegisterInvite = async (organizationID, email) => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations/${organizationID}/invite/${email}`, {
            method: "POST",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to send new invitation. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to send new invitation. Please try again later." };
    }
}

export const getUserInvitations = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations/invitations`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get invitations. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get invitations. Please try again later." };
    }
}


export const deleteInvitation = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL}organizations/invitations/${id}`, {
            method: "DELETE",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete this invite. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to delete this invite. Please try again later." };
    }

}

export const getXimdexTools = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}services`, {
            method: "GET",
            headers: {
                ...commonHeaders,
                Authorization: `Bearer ${getToken()}`
            },
        });
        if (!res.ok) {
            throw new Error("Failed to get the services. Please try again later.");
        }
        const json = await res.json();
        return json;
    } catch (err) {
        return { error: "Unable to get the services. Please try again later." };
    }
}


