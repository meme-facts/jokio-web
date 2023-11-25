import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import {
  createLikePost,
  deleteLikePost,
  getPosts,
  IGetAllPostParams,
  ILikePostsParam,
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

export function useLikePost(): UseMutationResult<
  void,
  unknown,
  ILikePostsParam
> {
  const queryClient = useQueryClient();
  return useMutation(createLikePost, {
    onSuccess: (data, variables) => {
      const { postId, ...params } = variables;

      queryClient.setQueriesData<{ posts: Posts[]; count: number } | undefined>(
        ["posts", params],
        (oldData) => {
          if (!oldData) {
            return undefined;
          }
          const postIndex = oldData.posts.findIndex(
            (post) => post.id === postId
          );
          if (postIndex > -1) {
            oldData.posts[postIndex as number].likedByLoggedUser = true;
          }
          return oldData;
        }
      );
    },
  });
}
export function useDislikePost(): UseMutationResult<
  void,
  unknown,
  ILikePostsParam
> {
  const queryClient = useQueryClient();
  return useMutation(deleteLikePost, {
    onSuccess: (data, variables) => {
      const { postId, ...params } = variables;
      queryClient.setQueriesData<{ posts: Posts[]; count: number } | undefined>(
        ["posts", params],
        (oldData) => {
          if (!oldData) {
            return undefined;
          }
          const postIndex = oldData.posts.findIndex(
            (post) => post.id === postId
          );
          if (postIndex > -1) {
            oldData.posts[postIndex].likedByLoggedUser = false;
          }
          return oldData;
        }
      );
    },
  });
}
