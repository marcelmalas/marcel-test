import React from "react";
import Input from "../input/Input";
import { InputLabelGroupProps } from "./InputLabelGroup.types";

import styles from "./InputLabelGroup.module.scss";

const InputLabelGroup: React.FC<InputLabelGroupProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputLabelContainer}>
      <label className={styles.label} htmlFor={props.id}>
        {label}
      </label>
      <div>
        <Input {...props} />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default InputLabelGroup;
