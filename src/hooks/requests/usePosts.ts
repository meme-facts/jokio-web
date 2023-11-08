import { useQuery, UseQueryResult } from "react-query";
import {
  getPosts,
  IGetAllPostParams,
  postDisliked,
  postLiked,
  Posts,
} from "../../requests/posts";

export const useGetAllPosts: (
  params: IGetAllPostParams
) => UseQueryResult<{ posts: Posts[]; count: number }, unknown> = (
  params: IGetAllPostParams
) => {
  return useQuery(["posts", params], () => getPosts(params), {
    staleTime: 1000 * 60,
  });
};
// export const usePostLiked: (params: {
//   postId: string;
// }) => UseQueryResult<unknown, unknown> = (params: { postId: string }) => {
//   return useQuery(["likes", params], () => postLiked(params), {
//     staleTime: 1000 * 60,
//   });
// };
// export const usePostDisliked: (params: {
//   postId: string;
// }) => UseQueryResult<unknown, unknown> = (params: { postId: string }) => {
//   return useQuery(["dislikes", params], () => postDisliked(params), {
//     staleTime: 1000 * 60,
//   });
// };
