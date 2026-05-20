import Swal from "sweetalert2";

export const SWAL_CONFIRM = "#0f172a";

export const swalSuccess = (title, text) =>
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: SWAL_CONFIRM,
  });

export const swalError = (title, text) =>
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: SWAL_CONFIRM,
  });
