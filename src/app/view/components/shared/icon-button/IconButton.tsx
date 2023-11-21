import * as React from "react";
import Button from "../button/Button";
import { IIconButtonProps } from "./IconButton.types";

import styles from "./IconButton.module.scss";

const IconButton: React.FunctionComponent<IIconButtonProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <Button {...props}>
      <div className={styles.iconTextContainer}>
        {icon} {text}
      </div>
    </Button>
  );
};

export default IconButton;
