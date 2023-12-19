import { useQuery, UseQueryResult } from "react-query";
import { getUserById, IGetUserById } from "../../requests/user";

export const useUserById: (
  id: string
) => UseQueryResult<IGetUserById, unknown> = (id: string) => {
  return useQuery(["userById", id], () => getUserById(id), {
    staleTime: 1000 * 60,
  });
};
