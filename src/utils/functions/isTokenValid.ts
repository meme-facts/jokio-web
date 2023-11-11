import { IUser } from "../../hooks/store/useAuthorization";
import jwt_decode from "jwt-decode";

export function isTokenValid(user?: IUser | null) {
  if (!user) {
    return false;
  }
  if (
    Number((jwt_decode(user.token) as { exp: string }).exp) <
    Date.now() / 1000
  ) {
    return false;
  }
  return true;
}
