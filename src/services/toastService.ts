import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
});

const successMessage = (data: any) => {
    Toast.fire({
        icon: 'success',
        position: 'bottom-end',
        title: `${data.toString()}`,
        timer: 2000
    })
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(data), 500))
}

const infoMessage = (data: any) => {
    Toast.fire({
        icon: 'info',
        position: 'bottom',
        title: `${data.toString()}`,
        timer: 2500
    });
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(data), 500))
}

const questionMessage = (data: any) => {
    Toast.fire({
        icon: 'question',
        position: 'bottom',
        title: `${data.toString()}`,
        timer: 2500
    });
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(data), 500))
}

const warningMessage = (data: any) => {
    Toast.fire({
        icon: 'warning',
        position: 'bottom',
        title: `${data.toString()}`,
        timer: 5000
    });
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(data), 500))
}

const errorMessage = (data: any) => {
    try {
        if (data.response.data.msg !== undefined) {
            Toast.fire({
                icon: 'error',
                title: `${data.response.data.msg}`,
                timer: 3000
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: `${data.tosString()}`,
                timer: 3000
            });
        }
    } catch (err) {
        Toast.fire({
            icon: 'error',
            title: `${data}`,
            timer: 3000
        });
    }
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 3000);
    })
}

const bugLoadingIonic = async () => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 200);
    })
}

export { errorMessage, successMessage, infoMessage, warningMessage, questionMessage, bugLoadingIonic }