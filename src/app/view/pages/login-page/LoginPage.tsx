import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { AuthUser } from "models/user.interface";
import { generateUniqueId } from "utils/generateUniqueId";
import logger from "utils/AppLogger";
import { mockLogin } from "utils/mockLogin";
import { validatePassword } from "utils/validatePassword";
import { useToast } from "hooks/useToast";
import IconButton from "app/view/components/shared/icon-button/IconButton";
import Loader from "app/view/components/shared/loader/Loader";
import Button from "app/view/components/shared/button/Button";
import InputLabelGroup from "app/view/components/shared/input-label-group/InputLabelGroup";
import useScreenType from "hooks/useScreenType";
import { ScreenType } from "models/ScreenType.enum";

import styles from "./LoginPage.module.scss";

const Login: React.FC = () => {
  const screenType = useScreenType();

  const { login } = useAuth();

  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserNameChange = (val: string) => {
    setUsername(val);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length === 0 || username.length === 0) {
      const message = "Username and password are required";
      addToast({ id: generateUniqueId(), message, type: "error" });
      return;
    }

    if (!validatePassword(password)) {
      const message =
        "Password should have minimum of 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 special character.";
      addToast({ id: generateUniqueId(), message, type: "error" });
      return;
    }

    try {
      setIsLoading(true);

      const response = await mockLogin(username, password);

      const { message, success, token, user } = response;

      if (success && user) {
        logger.info("Login successful", response);

        const { email, id, name, role, avatar } = user;

        const authUser: AuthUser = {
          email,
          id,
          name,
          role,
          avatar,
        };

        login(authUser, token);
      } else {
        addToast({ id: generateUniqueId(), message, type: "error" });
      }
    } catch (error) {
      logger.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.imageContainer} />
      <section className={styles.contentContainer}>
        <div className={styles.formContainer}>
          {screenType !== ScreenType.Mobile ? (
            <h1>Sign In to Continue.</h1>
          ) : (
            <h3>Sign In to Continue</h3>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldsContainer}>
              <InputLabelGroup
                label="Username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUserNameChange}
              />

              <InputLabelGroup
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {isLoading ? (
              <IconButton
                disabled
                type="submit"
                text="Sign in"
                icon={<Loader />}
              />
            ) : (
              <Button type="submit">Sign in</Button>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
