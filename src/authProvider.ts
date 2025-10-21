import { AuthProvider } from "react-admin";
import axios from "axios";
import { axiosClient } from "./clientProvider";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await axiosClient.v1AdminLoginCreate(
        {
          password,
          username,
        },
        {
          secure: false,
        },
      );

      if (response.data) {
        const { id, username, role, access_token } = response.data.data!;
        localStorage.setItem("token", access_token);
        localStorage.setItem("id", id);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        return Promise.resolve();
      }

      return Promise.reject(new Error("Login failed"));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(
          new Error(
            error.response.data?.message || "Invalid username or password",
          ),
        );
      }
      return Promise.reject(new Error("Network error. Please try again."));
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    return token ? Promise.resolve() : Promise.reject();
  },

  checkError: async (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (username && id) {
      return Promise.resolve({
        id: id,
        fullName: username,
        avatar: undefined,
        role: role,
      });
    }
    return Promise.reject();
  },

  getPermissions: async () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
