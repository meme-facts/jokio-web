import { useQuery, UseQueryResult } from "react-query";
import { getPosts, IGetAllPostParams, Posts } from "../../requests/posts";

export const useGetAllPosts: (
  params: IGetAllPostParams
) => UseQueryResult<{ posts: Posts[]; count: number }, unknown> = (
  params: IGetAllPostParams
) => {
  return useQuery(["posts", params], () => getPosts(params), {
    staleTime: 1000 * 60,
  });
};
