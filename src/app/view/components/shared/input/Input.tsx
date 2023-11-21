import React, { ChangeEvent } from "react";
import { IInput } from "./Input.types";

import styles from "./Input.module.scss";

const Input: React.FC<IInput> = ({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
};

export default Input;
