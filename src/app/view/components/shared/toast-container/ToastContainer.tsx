import React from "react";
import Toast from "../toast/Toast";

import { IToastContainerProps } from "./ToastContainer.types";

import styles from "./ToastContainer.module.scss";

const ToastContainer: React.FC<IToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
