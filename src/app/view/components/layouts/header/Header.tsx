import React from "react";
import { IHeaderProps } from "./Header.types";

import LOGOUT_ICON from "assets/icons/logout-icon.svg";

import styles from "./Header.module.scss";

const Header: React.FC<IHeaderProps> = ({ onLogout, avatarUrl }) => {
  return (
    <div className={styles.header}>
      <h3>Dashing test</h3>
      <div className={styles.actions}>
        <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        <img
          src={LOGOUT_ICON}
          alt="logout-icon"
          onClick={onLogout}
          className={styles.logoutButton}
        />
      </div>
    </div>
  );
};

export default Header;
