import usersService from "services/usersService";
import { generateRandomToken } from "./generateRandomToken";

export const mockLogin = async (username: string, password: string) => {
  const users = await usersService.getUsers();

  const user = users.find(
    (u) => u.name === username && u.password === password
  );

  // Simulate a successful login
  if (user) {
    return {
      user: user,
      success: true,
      token: generateRandomToken(10),
      message: "Login successful",
    };
  }

  // Simulate an unsuccessful login
  return {
    success: false,
    token: null,
    message: "Invalid username or password",
  };
};
