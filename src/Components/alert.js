import Swal from 'sweetalert2'

const AlertMessage = (title, text, icon) => {
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: `${icon}`
    });
}
export default AlertMessage