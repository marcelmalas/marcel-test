import React, { useState, ReactNode } from "react";

import ARROW_ICON from "assets/icons/arrow-down-icon.svg";

import styles from "./Collapse.module.scss";

interface CollapseProps {
  children: ReactNode;
  title: string;
}

const Collapse: React.FC<CollapseProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.header} ${
          isOpen ? styles.visible : styles.hidden
        }`}
        onClick={toggleCollapse}
      >
        <h5>{title}</h5>
        <img src={ARROW_ICON} alt="arrow-icon" />
      </div>
      <div
        className={`${styles.contentContainer} ${
          isOpen ? styles.visible : styles.hidden
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
