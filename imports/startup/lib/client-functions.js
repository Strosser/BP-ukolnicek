export const showLoader = () => {
    Session.set('isLoader', true);
}

export const hideLoader = () => {
    Session.set('isLoader', false);
}

export const showMessage = (content, icon, hideTime) => {
    const swal = require ('sweetalert2');
    swal.fire({
        icon: icon || "error",
        title: content,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: hideTime || 3000,
        timerProgressBar: true,
        showCloseButton: true,
        width: '400px'
      })
}