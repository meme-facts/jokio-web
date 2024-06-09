import {
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  getCommentsByPostId,
  Comment,
  IGetAllCommentsByPostIdParams,
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


