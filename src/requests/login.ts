import { UserCredential } from "firebase/auth";
import { JokioBackend } from "../services/api";

export interface ILogin {
  login: string;
  password: string;
}

export async function login({ login, password }: ILogin) {
  const { data } = await JokioBackend.post("/users/login", { login, password });

  return data;
}

export async function google(userCredentials: UserCredential) {
  const { data } = await JokioBackend.post("/users/google", userCredentials);

  return data;
}
