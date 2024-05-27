const { 
    VITE_APP_API_BASE_URL,
    VITE_APP_ENVIROMENT,
    VITE_APP_CLIENT
} = import.meta.env;

export const CLIENT = VITE_APP_CLIENT.toUpperCase()
export const ENVIRONMENT = VITE_APP_ENVIROMENT.toLowerCase().startsWith('pro') ? 'PRO' : 'PRE' 
export const COOKIE_NAME = `XIMDEX_${CLIENT}_${ENVIRONMENT}`


export const API_BASE_URL = VITE_APP_API_BASE_URL



export const FAKE_USER = {
      "id": 7,
      "name": "Federico",
      "email": "test@ximdex.com",
      "email_verified_at": null,
      "roles": [{name:"admin"}, {name:"superAdmin"}],
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzFhMjBiOS04YmMwLTRmMGUtYjIwZi01NmNkNWJmYTk1Y2IiLCJqdGkiOiJhMGZiMDYzYWMyMWYxOGY1Y2U1NzcyOTdlMjczOTUxOTc5ZDQ0NmVmN2Y0MjgxMzBiNDlhOWQwYzZkMjNkODM5MjM4NjBhMTFlNjVjOWFjNiIsImlhdCI6MTcxNjM2NTUzOS4wNTMyMSwibmJmIjoxNzE2MzY1NTM5LjA1MzIxNSwiZXhwIjoxNzQ3OTAxNTM5LjA0NDk0Nywic3ViIjoiYTM3MjlhNzYtYjJjZC00MTA1LWIwZWMtNTQ4NzBmNzA1M2E5Iiwic2NvcGVzIjpbXX0.e3Ie5fd8b5YWLbz3sVCq3-7Og0cViodHuofILBqBbzKpK4gwx_WXDLNWdX3hBBjqU2E-CIyhNxy1OX2GJaI8KjgIKxbvqcil3r1DxJsmjs4hs4xI3g0ZwbKr-h6W2PXpvKFzh8E6aqk8WgpVjoyG3NtzXjGfNh8TXPgGrWjL2kiOgQ7ABXXuWGrVwpyz9TGgjYC4BN7DJ_2MO3HZFalRu3tIWMiMibFfLAggsh9k0C2_ORjLfKDQhSGW5ymX7jRqfnISvRAY6BZlxi9X4v16AiLXRonoJhPRg6Z8zm-dP9ci4V0y37p76WqyCeGe_q4isQ-k9fjLdNthNUK3YkbacfGrrcGX2fmNNvEB3eNjt-aV7GNUQf3hPRFE_RwSdZvuFb6r2aJRVlTW5co1EGyqu08BmDRI4cZo3VhDRzguHTlq8SW7uO9L6Mm8x-Ra4d5-Trqak8A4YXkHgxZl8Q1BSM2tRZygkzCsTDpvNMMQdRFR4OZ30WouMwiwBleCslzErEX4C-Cu_AzegK2fMmh3E99dcDlHpPeW4zslp-MTMOGZsrWLv5i-jzCcwjoSkuOvhHyErqXm097gkGv-C7Z5k45aHTXWtZZzkY-X3ouCktptSkezvz4Da6hWtYlQV1OwI-yPRvtnJsxFwVuByHI0omirLxViNrzUHtNWTLObaVc"

    }


export const GENDER_OPTIONS = [
  {value: 'M', label: 'Male'},
  {value: 'F', label: 'Female'}
]


export const PERMISSIONS_OPTIONS = [
  {value: 'admin', label: 'Admin'},
  {value: 'editor', label: 'Editor'},
  {value: 'creator', label: 'Creator'},
  {value: 'viewer', label: 'Viewer'},
]


export const USER_TABS = [
  'Users',
  'Invites'
]