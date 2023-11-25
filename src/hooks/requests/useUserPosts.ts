import { useQuery, UseQueryResult } from "react-query";
import {
  getPostsByUserId,
  IGetAllPostParams,
  Posts,
} from "../../requests/posts";

export const useUserPosts: (
  params: IGetAllPostParams,
  userId: string
) => UseQueryResult<{ posts: Posts[]; count: number }, unknown> = (
  params: IGetAllPostParams,
  userId: string
) => {
  return useQuery(
    ["postsByUserId", params, userId],
    () => getPostsByUserId(params, userId),
    {
      staleTime: 1000 * 60,
    }
  );
};
