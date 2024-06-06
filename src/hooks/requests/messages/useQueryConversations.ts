import { useQuery, UseQueryResult } from "react-query";
import { getPosts, IGetAllPostParams, Posts } from "../../../requests/posts";
import { EQueries } from "../../../enums/reactQueryTags/queries.enum";
import { getAllMessages, IAllMessages } from "../../../requests/messages";

export const useQueryConversations: () => UseQueryResult<
  IAllMessages[],
  unknown
> = () => {
  return useQuery(EQueries.conversations, () => getAllMessages(), {
    staleTime: 1000 * 60,
  });
};
