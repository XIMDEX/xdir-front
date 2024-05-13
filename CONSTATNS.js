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
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzAyMDA5NS03NzMxLTQ1YWUtYjkwZS02NDVlNmJmZjMwODYiLCJqdGkiOiI3YjNkMTM5ZTMyODRkYjY3MmM1ODk4ZTNlZjRiNmZjNjFhMzkxOTcwMzAxNzBhMWFhNTRjOTAxZTMzMDNmYjhkMjY5YTkwNDk4YWVjNjA3NSIsImlhdCI6MTcxNTU5NDQ4OS40MzEwNDcsIm5iZiI6MTcxNTU5NDQ4OS40MzEwNTIsImV4cCI6MTc0NzEzMDQ4OS40MjU4NjcsInN1YiI6IjVhZTE1MDcwLWYwZjItNDM2Yi1hMWU2LTk3NzBkZjZjMWFiNyIsInNjb3BlcyI6W119.BfNKshlNdOCmxe3F6I6R9xwP9YQXLu32TwR5CsoiNtSQ8fOM7fqnt9gP3CxYFdN1Vj7WnYtdPYXTyV-ZAJda3-1PGG8fMHz5ePse4MDBXeIrqZDI7Mkp30m6sJYVYSjE7wizrZN9ejH_oaseSfeuIj9GxcHcP63tbjVdTv7MSFKjwzdsB46L7ODMwg7Svxuz8m5Ri-p5XR0DK2vFLAjFUj5-OcDpUUNeu_g8ajd1QVIkF7MU275RPCkGdvl4S1RrEtVCCm3mfmKntspJEJzpVHvowb16IIB9eib_y9v6HTLK_Lg4Z9dknSP_b6QYqHJ3Yi2Xv9Pk-xOl7H9kQrAxcYcBDW5u74hFkh5fF1pZNe5CraLIxChNqRlXwQNeg11BnfAetAMuRjYxc8e2GtR-0D2Tu6sm75hFhTGTBYvdCp7XTTUbCiFBFZq-e924voaxljnMUsZ4NjZGhQAQ0MYg8RyPjI9TzX20ZQPgzTjeJCAbiJSQT_qnzntzh5d61fk8ZIcMNjVJ7q7UwCLTuGpjgmgH8ik4fEFZ-jIyJsmzh9KocO9ls4-CSnDBz9x_E7RvWXNlL4Pdeq_a1FCc9h_BNKpBrSRhXbySNEFCegbNa2UgcoTDJ8U6G5LBK2rGHI7NhGQ3QyvC6-l5Uzy3FYhrqrLvCZy2MNNwMzdNwB3lx0g",
      "roles": [{name:"admin"}, {name:"superAdmin"}]

    }


export const GENDER_OPTIONS = [
  {value: 'M', label: 'Male'},
  {value: 'F', label: 'Female'}
]