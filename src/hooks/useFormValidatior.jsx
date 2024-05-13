import Swal from "sweetalert2";

export default function useFormValidator (){


    const validatePhoneNumber = (number) => {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        const  validation = regex.test(number);
        return validation
    }
    
    const validatePassword = (password) => {
        var validationPasswordObject = {
            length: false,
            hasLowerCase: false,
            hasUpperCase: false,
            hasNumber: false
        }

        if(password.length < 8) validationPasswordObject = {...validationPasswordObject, length: false};
        else validationPasswordObject = {...validationPasswordObject, length: true};

        if(password.search(/[a-z]/) < 0) validationPasswordObject = {...validationPasswordObject, hasLowerCase: false};
        else validationPasswordObject = {...validationPasswordObject, hasLowerCase: true};

        if(password.search(/[A-Z]/) < 0) validationPasswordObject = {...validationPasswordObject, hasUpperCase: false};
        else validationPasswordObject = {...validationPasswordObject, hasUpperCase: true};

        if(password.search(/[0-9]/) < 0) validationPasswordObject = {...validationPasswordObject, hasNumber: false};
        else validationPasswordObject = {...validationPasswordObject, hasNumber: true};

        return validationPasswordObject
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validation = regex.test(email);
        return validation
    }   

    return {
        validatePhoneNumber,
        validatePassword,
        validateEmail,
    };
}