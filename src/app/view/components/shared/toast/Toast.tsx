import React, { useState, useEffect } from "react";
import { IToast } from "./Toast.types";

import styles from "./Toast.module.scss";

interface ToastProps {
  toast: IToast;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [animationClass, setAnimationClass] = useState(styles.enter);

  const toastTypeClass = styles[toast.type];

  useEffect(() => {
    setAnimationClass(styles.enter);

    const timeoutId = setTimeout(() => {
      setAnimationClass(styles.exit);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [toast.id]);

  useEffect(() => {
    if (animationClass === styles.exit) {
      const timeoutId = setTimeout(() => {
        onClose(toast.id);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [animationClass, onClose, toast.id]);

  return (
    <div className={`${styles.toast} ${toastTypeClass} ${animationClass}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
