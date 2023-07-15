import { JokioBackend } from "../services/api";

export interface ILogin {
  login: string;
  password: string;
}

export async function login({ login, password }: ILogin) {
  const { data } = await JokioBackend.post("/users/login", { login, password });

  return data;
}
