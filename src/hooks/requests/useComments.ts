import { useQuery, UseQueryResult } from "react-query";
import {
  Comments,
  getComments,
  IGetAllCommentsParams,
} from "../../requests/comments";

export const useGetAllComments: (
  params: IGetAllCommentsParams
) => UseQueryResult<{ comments: Comments[]; count: number }, unknown> = (
  params: IGetAllCommentsParams
) => {
  return useQuery(["comments", params], () => getComments(params), {
    staleTime: 1000 * 60,
  });
};
