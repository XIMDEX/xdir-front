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
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzFhMjBiOS04YmMwLTRmMGUtYjIwZi01NmNkNWJmYTk1Y2IiLCJqdGkiOiJjNjk1MDlkZTI5MzZhYzIxMzYzNTEwNzViYTNjODRlNTFhZWRhYzYxYzE3YjUyYjRkOGUwZmU5ZmM1MGZhMWJiZTQ3OGQwYWQ5NDJlMDBkYyIsImlhdCI6MTcxNjc5NzkwMi4zMDkwODksIm5iZiI6MTcxNjc5NzkwMi4zMDkwOTQsImV4cCI6MTc0ODMzMzkwMi4zMDI1ODksInN1YiI6ImQwMDg0MzFkLThlODEtNDBkZC05ODIzLTQzZDUxNzM3MGQ1NCIsInNjb3BlcyI6W119.irht6RGFpYY9ZxX18hexn1FoLC5Zy-UmPyaCx-wPSt7qoYZKPigpwKzBDYOBFqFAghUjLuS5yXKy8fXP4n4f1DoETnj9FsOGr6HJueTUFvwBVTkaSwyniGa88M1sGeswsCudVKXfD5t9LT2gmRh-nqMcilva66pucgioxHL8WnOf9Ri7ZqV3oUW1D0c-QFH81HL154MefrJU5QJQJXKeMiSuy3WpqowZl6cN3GOt_mxXJkPm3vukHtTY908dPPawvjzT7A9q0DntfIZxiilq9pjOnvRXDkYsh11EYHVayAUBoCcrT5X8RZPU2aedJGDeSuK6PTi63-Pqd90bhKFWiQDCO0f6kp-5pjf20V6mIqJqtwOWrlb9gnJP7ra824TlRjO-lZftJIf1YMJ40X26xWWaXhhGp-ggTbGWBDfDtNjrHQ1-PE2l9GERjihJQafq9QL4bJgBgKCJlBPRGhMiUvc40hqzdnbKlr_Vw8S-rPuHUHQljTfxWYVHQ0C4oiDLtCP1uGdjn_tNC2NPDnREc_JuXq4gkvmzmwA6IXOif32NDFfLyuF-vqXUxokTLLAsKa8VqwN9XnHnoi4zpb7jGhhEAJPTE31yaOaYAygTXyX75kwCfQRQz_CQm43AB9W7h9zOUQl722JXcekN4StMRKpITeLHfyCWueq5qyP2gHg"
}


export const GENDER_OPTIONS = [
  {value: 'M', label: 'Male'},
  {value: 'F', label: 'Female'}
]


export const ROLES_OPTIONS = [
  {value: 'reporter', label: 'Reporter'},
  {value: 'viewer', label: 'Viewer'},
  {value: 'creator', label: 'Creator'},
  {value: 'editor', label: 'Editor'},
  {value: 'publisher', label: 'Publisher'},
  {value: 'admin', label: 'Admin'},
  {value: 'superadmin', label: 'Super Admin'},
]


export const SERVICES_OPTIOINS = [
  {value: 'xdam', label: 'XDam'},
  {value: 'xeval', label: 'XEval'},
  {value: 'xdir', label: 'XDir'},
]

export const USER_TABS = [
  'Users',
  'Invites'
]


export const ROLE_TABS = [
  'Roles',
  'Permissions'
]