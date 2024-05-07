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
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YmZiZjgxZS03OGRmLTQyNjItOGM0Ni1jYTkwMzAzMTZlYzQiLCJqdGkiOiJkNDhiYmFkNTI2MTVhNDk2OTQwMjM0MDFhZDYxYWM0YjQ0NTg1M2ZhZTZkNWVjNzBhZTJhODJhZjMzYTEzMjYxYzczNDliYjY5NzRjNzQ4MCIsImlhdCI6MTcxNTA3NTU0NC42OTQ2MDEsIm5iZiI6MTcxNTA3NTU0NC42OTQ2MDQsImV4cCI6MTc0NjYxMTU0NC42ODkyMzgsInN1YiI6IjciLCJzY29wZXMiOltdfQ.ElDVyOkSMUn0Ta4ZWTU0eUao_dFcYEVpolAtHJ-1Qkstic1uCy27mbbHitmo4MP7dpMsIcLzwn4vUOYrzglasNPWB2VVoKUVlPc2LLkLZM_LjtufXUpxtBk2ssF2I5du3mYRLJLVDFicIZ3kY2yIWYvpYL2iViA7gDsb_xkdsQUgJ3XT9OwjAEgx2haEFEbMsQZNpjhbqlraOQVwZVv6zEdl8j-6TSqbzR3PTt5geLxc_i99unhwyHmbPg2fPI-xIr-hONRQANGYOy7b6eMriHd1m0Wyq35t1fSQPCiw5NrPPNKa2-gIjysl7SHHmCq10CXjylyFO1aSdyDe0RYVD4g4kQv680fB4nHqwzXEtC0sfHfqLi79HbBsjpYvVrdgjSqKt_qdrm22KEuXcgXuxtfcz5ozD7kAir5jb-DDWCUPXEgVIUEco_3H976V_ngwTjC1oViZ_T0pkFFWAQLTE5sNsDoayHSbufk8Net_1w4eQdYhYSjVpZQIBZDkxZITF5fWbLudMxCTP9Ed1w_phzhpDQXc7wjPlHzrs_0Rc7Da_U7PA0fjv_gqpTq-2qL9TmaX3OVkyjGJ59RvVG-FLqnf9ojz_xYjZsx77Q4OyA5_dZqIcl9-wzYmflj7tCi4uLHwoVMIW7cb9naqMgm1lwmt3VeNHZh8-X4_LYmCjxc",
      "roles": [{name:"admin"}, {name:"superAdmin"}]

    }