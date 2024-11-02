import Swal from "sweetalert2";

interface ConfirmationAlertOptions {
  title?: string;
  confirmButtonText?: string;
  denyButtonText?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
  showCancelButton?: boolean;
}

export function showConfirmationAlert({
  title = "Do you want to proceed?",
  confirmButtonText = "Confirm",
  denyButtonText = "Cancel",
  onConfirm = () => {},
  onDeny = () => {},
  showCancelButton = true,
}: ConfirmationAlertOptions): void {
  Swal.fire({
    title,
    showDenyButton: true,
    showCancelButton,
    confirmButtonText,
    denyButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Confirmed!", "", "success");
    } else if (result.isDenied) {
      onDeny();
      Swal.fire("Cancelled", "", "info");
    }
  });
}
