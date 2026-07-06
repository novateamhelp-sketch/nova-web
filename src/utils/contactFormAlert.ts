import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const swalBase = {
  confirmButtonColor: "#c5a059",
  confirmButtonText: "OK",
  buttonsStyling: true,
  customClass: {
    popup: "contact-form-swal-popup",
    title: "contact-form-swal-title",
    htmlContainer: "contact-form-swal-text",
    confirmButton: "contact-form-swal-confirm",
  },
};

export const showContactFormSuccess = (message: string) =>
  Swal.fire({
    ...swalBase,
    icon: "success",
    title: "Request sent",
    text: message,
  });

export const showContactFormError = (message: string) =>
  Swal.fire({
    ...swalBase,
    icon: "error",
    title: "Could not submit",
    text: message,
  });
