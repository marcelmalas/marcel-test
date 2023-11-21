import { AUTH_BASE_URL } from "constants/apiEndpoints";
import { baseURL } from "constants/configs";
import { IUser } from "models/user.interface";

const usersService = {
  getUsers: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${baseURL}${AUTH_BASE_URL}`);
      const users: IUser[] = await response.json();
      return users;
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;
