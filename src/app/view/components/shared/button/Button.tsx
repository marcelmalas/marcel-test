import React from "react";
import { IButton } from "./Button.types";

import styles from "./Button.module.scss";

const Button: React.FC<IButton> = ({
  onClick,
  children,
  type = "button",
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={styles.btn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
