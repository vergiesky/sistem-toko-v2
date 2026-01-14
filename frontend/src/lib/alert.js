import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const defaultButtons = {
  confirmButtonColor: "#f97316",
  cancelButtonColor: "#6b7280",
  buttonsStyling: false,
  didOpen: (popup) => {
    const actions = popup.querySelector(".swal2-actions");
    if (actions) {
      actions.style.gap = "12px";
    }
  },
  customClass: {
    confirmButton:
      "swal2-confirm px-5 py-2.5 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-200",
    cancelButton:
      "swal2-cancel px-5 py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-200",
    popup: "rounded-2xl shadow-lg",
  },
};

export function alertSuccess(title, text) {
  return MySwal.fire({
    icon: "success",
    title,
    text,
    ...defaultButtons,
  });
}

export function alertError(title, text) {
  return MySwal.fire({
    icon: "error",
    title,
    text,
    ...defaultButtons,
  });
}

export function alertWarning(title, text) {
  return MySwal.fire({
    icon: "warning",
    title,
    text,
    ...defaultButtons,
  });
}

export function alertConfirm({
  title,
  text = '',
  html,
  confirmButtonText = "Ya",
  cancelButtonText = "Batal",
  icon = "warning",
}) {
  const isDelete = confirmButtonText.toLowerCase().includes("hapus");
  const confirmButtonColor = isDelete
    ? "#dc2626"
    : defaultButtons.confirmButtonColor;
  const confirmButtonClass = isDelete
    ? "swal2-confirm px-5 py-2.5 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-200"
    : defaultButtons.customClass.confirmButton;

  const payload = {
    icon,
    title,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    ...defaultButtons,
    customClass: {
      ...defaultButtons.customClass,
      confirmButton: confirmButtonClass,
    },
  };

  if (html) {
    payload.html = html;
  } else if (text) {
    payload.text = text;
  }

  return MySwal.fire(payload);
}

export default MySwal;
