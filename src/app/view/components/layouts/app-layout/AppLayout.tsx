import React from "react";
import { useAuth } from "hooks/useAuth";
import Header from "../header/Header";

import styles from "./AppLayout.module.scss";

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  const { logout, user } = useAuth();
  return (
    <main className={styles.layoutContainer}>
      <header className={styles.headerContainer}>
        <Header avatarUrl={user?.avatar || ""} onLogout={logout} />
      </header>
      <section className={styles.section}>
        <h3>
          Welcome to <span>Dashing test</span> , Glad to have you here!
        </h3>
        <div>{children}</div>
      </section>
    </main>
  );
};

export default AppLayout;
