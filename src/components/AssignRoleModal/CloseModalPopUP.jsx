const XDirModal = async ({text,title, confirmButtonColor, textColor, onConfirmFunction, showCancelButton}) => {
    Swal.fire({
        text: text,
        title: title,
        showCancelButton: showCancelButton ?? true,
        confirmButtonText: 'ACCEPT',
        color: textColor ?? 'black',
        confirmButtonColor: confirmButtonColor ?? '#43a1a2',
        cancelButtonText: 'CANCEL',
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


const closeModalControl = ({canSave, setOpenModal}) => {
    if(canSave){
        XDirModal({
            text:`Are you sure you want to close without save?`,
            title:'Close Assign Role',
            confirmButtonColor:'#43a1a2',
            onConfirmFunction: () => setOpenModal(false)
        })
    }else{
        setOpenModal()
    }
}
export default closeModalControl