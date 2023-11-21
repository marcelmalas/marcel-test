import React from "react";
import { IModalProps } from "./Modal.type";

import CLOSE_ICON from "assets/icons/close-icon.svg";

import styles from "./Modal.module.scss";

const Modal: React.FC<IModalProps> = ({
  show,
  onClose,
  headerText,
  children,
}) => {
  const overlayClasses = show
    ? `${styles.overlay} ${styles.show}`
    : styles.overlay;
  const modalClasses = show ? `${styles.modal} ${styles.show}` : styles.modal;

  return (
    <div className={overlayClasses}>
      <div className={modalClasses}>
        <div className={styles.modalHeader}>
          <h3>{headerText}</h3>
          <img
            src={CLOSE_ICON}
            alt="close-icon"
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
