import { useQueryClient } from "react-query";
import { IAllMessages, MessagesEntity } from "../../../requests/messages";
import { EQueries } from "../../../enums/reactQueryTags/queries.enum";
import { Updater } from "react-query/types/core/utils";
import { useAuthorization } from "../../store/useAuthorization";
import { UserEntity } from "../../../requests/user";

export function useUpdateConversationData() {
  const queryClient = useQueryClient();
  const { user } = useAuthorization();
  function updateData(data: MessagesEntity, chattingWith: UserEntity) {
    queryClient.setQueryData(
      [EQueries.conversation, chattingWith.id],
      (prev: any) => {
        if (prev) {
          return {
            ...prev,
            pages: [
              {
                messagesBetweenUsers: [data],
                count: prev.pages[0].count + 1,
                offset: prev.pages[0].offset + 1,
              },
              ...prev.pages,
            ],
          };
        }
        return {
          pages: [
            {
              messagesBetweenUsers: [data],
              count: 1,
              offset: 1,
            },
          ],
        };
      }
    );
    queryClient.setQueryData(
      [EQueries.conversations],
      (prev?: IAllMessages[] | undefined) => {
        const previous = [...(prev ?? [])];
        const conversationWith =
          data.fromUserId === user?.id ? data.toUserId : data.fromUserId;
        const { fromUser, ...message } = data;
        const newConversation = {
          ...message,
          chattingWith: chattingWith,
        };
        const index = previous.findIndex(
          (conversation) => conversation.chattingWith.id === conversationWith
        );
        if (index !== -1) {
          previous.splice(index, 1);
          return [newConversation, ...previous];
        }
        return [newConversation, ...previous];
      }
    );
  }
  return { updateData };
}
