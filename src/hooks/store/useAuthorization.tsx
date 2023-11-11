import { create } from "zustand";
import { JokioBackend } from "../../services/api";

export interface IUser {
  id: string;
  nickname: string;
  email: string;
  token: string;
}

interface IFilterState {
  user: IUser | null;
  setUser: (params: IUser) => void;
  logOut: () => void;
}

const USER_LOCAL_STORAGE = "@jokio_user" as const;

const getInitialLoggedIn = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem(USER_LOCAL_STORAGE);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as IUser;
      JokioBackend.defaults.headers.common.authorization = `Bearer ${parsedUser.token}`;
      return parsedUser;
    }
    return null;
  }
};

export const useAuthorization = create<IFilterState>((set) => ({
  user: getInitialLoggedIn() ?? null,
  setUser: (user) =>
    set(() => {
      JokioBackend.defaults.headers.common.authorization = `Bearer ${user.token}`;
      localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(user));
      return {
        user: user,
      };
    }),
  logOut: () =>
    set(() => {
      JokioBackend.defaults.headers.common.authorization = null;
      localStorage.removeItem(USER_LOCAL_STORAGE);
      return {
        user: null,
      };
    }),
}));
