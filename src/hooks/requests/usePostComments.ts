import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import {
  getCommentsByPostId,
  Comment,
  IGetAllCommentsByPostIdParams,
  createComment,
  ICommentPostParam,
} from "../../requests/comments";

export const useGetAllPostComments: (
  params: IGetAllCommentsByPostIdParams,
) => UseQueryResult<{ comments: Comment[]; count: number }, unknown> = (
  params: IGetAllCommentsByPostIdParams,
) => {
    return useQuery(["comments", params], () => getCommentsByPostId(params), {
      staleTime: 1000 * 60,
    });
  };

export function usePostComment(): UseMutationResult<void, unknown, ICommentPostParam> {
  const queryClient = useQueryClient();
  return useMutation(createComment,{
    onSuccess: (data, variables) => {
      const { postId, ...params } = variables;
      queryClient.setQueriesData<{ comments: Comment[]; count: number } | undefined>(
        ["comments", params],
        (oldData) => {
          if (!oldData) {
            return undefined;
          }
         
         
          return oldData;
        }
      );
    },
  
    });
}

