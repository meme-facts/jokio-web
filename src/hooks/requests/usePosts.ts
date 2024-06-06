import { useQuery, UseQueryResult } from "react-query";
import { getPosts, IGetAllPostParams, Posts } from "../../requests/posts";
import { EQueries } from "../../enums/reactQueryTags/queries.enum";

export const useGetAllPosts: (
  params: IGetAllPostParams
) => UseQueryResult<{ posts: Posts[]; count: number }, unknown> = (
  params: IGetAllPostParams
) => {
  return useQuery([EQueries.posts, params], () => getPosts(params), {
    staleTime: 1000 * 60,
  });
};
