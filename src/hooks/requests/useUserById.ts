import { useQuery, UseQueryResult } from "react-query";
import { getUserById, IGetUserById } from "../../requests/user";
import { EQueries } from "../../enums/reactQueryTags/queries.enum";

export const useUserById: (
  id: string
) => UseQueryResult<IGetUserById, unknown> = (id: string) => {
  return useQuery([EQueries.userById, id], () => getUserById(id), {
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
