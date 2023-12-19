import router from "next/router";
import { useAuthorization } from "../store/useAuthorization";
import { isTokenValid } from "../../utils/functions/isTokenValid";
import { useEffect } from "react";

export const useLoginManagement = () => {
  const { user, logOut } = useAuthorization();
  useEffect(() => {
    if (!isTokenValid(user)) {
      logOut();
    } else {
      router.push("./app");
    }
  }, []);
};
