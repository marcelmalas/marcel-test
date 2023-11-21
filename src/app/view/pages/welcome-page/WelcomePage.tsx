import React, { useState, useEffect, useRef, lazy, Suspense } from "react";

import styles from "./WelcomePage.module.scss";

const LoginPage = lazy(() => import("../login-page/LoginPage"));

const WelcomePage: React.FC = () => {
  const [animationDone, setAnimationDone] = useState(false);
  const welcomeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setAnimationDone(true);
    };

    const welcomeEl = welcomeRef.current;
    welcomeEl?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      welcomeEl?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <>
      {!animationDone ? (
        <div className={styles.container}>
          <h1 ref={welcomeRef} className={styles.welcomeText}>
            Welcome!
          </h1>
        </div>
      ) : (
        <Suspense fallback={null}>
          <LoginPage />
        </Suspense>
      )}
    </>
  );
};

export default WelcomePage;
