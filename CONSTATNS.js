const { 
    VITE_APP_API_BASE_URL,
    VITE_APP_ENVIROMENT,
    VITE_APP_CLIENT
} = import.meta.env;

export const CLIENT = VITE_APP_CLIENT.toUpperCase()
export const ENVIRONMENT = VITE_APP_ENVIROMENT.toLowerCase().startsWith('pro') ? 'PRO' : 'PRE' 
export const COOKIE_NAME = `XIMDEX_${CLIENT}_${ENVIRONMENT}`


export const API_BASE_URL = VITE_APP_API_BASE_URL