import Swal from "sweetalert2";
import './sweetAlertClasses.css'

export default function useModals () {

    const XDirModal = async ({text,title, confirmButtonColor, textColor, onConfirmFunction, showCancelButton}) => {
        Swal.fire({
            text: text,
            title: title,
            showCancelButton: showCancelButton ?? true,
            confirmButtonText: 'Accept',
            color: textColor ?? 'black',
            confirmButtonColor: confirmButtonColor ?? '#43a1a2',
            background: 'rgb(255,255,255)',
            focusConfirm: false,
            customClass: {
                popup: 'modalContainer',
            },
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
            },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            }
        }).then(async(result) => {
            if (result.isConfirmed) {
                onConfirmFunction()
            }
        })
    }
    const XDirModalInput = async ({title,input,inputLabel, inputPlaceholder,inputValidator,confirmButtonColor, textColor}) => {
        const {value} = await Swal.fire({
            title: title,
            input: input,
            inputLabel: inputLabel,
            inputPlaceholder: inputPlaceholder,
            showCancelButton: true,
            inputValidator:inputValidator,
            confirmButtonText: 'Submit',
            color: textColor ?? 'black',
            confirmButtonColor: confirmButtonColor ?? '#43a1a2',
            background: 'rgb(255,255,255)',
            customClass: {
                popup: 'modalContainer',
                input: 'customInputClass'
            },
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
            },
            hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            }
        });
        return value
    };

   
    return {
        XDirModal,
        XDirModalInput
    }
}
