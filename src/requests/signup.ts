import { JokioBackend } from "../services/api";

export interface ISignup {
  full_name: string;
  nickname: string;
  email: string;
  password: string;
}

export async function signup({ full_name, nickname, email, password }: ISignup) {
  const { data } = await JokioBackend.post("/users", { full_name, nickname, email, password });

  return data;
}
