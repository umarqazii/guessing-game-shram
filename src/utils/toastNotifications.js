import toast from "react-hot-toast";

// toast notifications
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
  });
};