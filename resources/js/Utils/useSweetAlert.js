import Swal from "sweetalert2";

export function notifySuccess(message) {
    Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        timer: 1800,
        showConfirmButton: false,
    });
}

export function notifyError(message) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    });
}

export function confirmDialog(message = "Are you sure?") {
    return Swal.fire({
        title: "Confirm",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    });
}
