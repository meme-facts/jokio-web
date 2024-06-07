import { Reloader } from "@components/Profile/UserGrid/styles";
import { Div, HStack, VStack } from "@components/shared/flex/Stacks";
import { Button } from "@components/shared/form/Button";
import { P, P1, XP } from "@components/shared/text/Paragraph";
import { FadeLoader } from "react-spinners";
import { Content, Conversation, ConversationMessage } from "./styles";

import Icon from "@components/shared/Icon";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { EQueries } from "../../../enums/reactQueryTags/queries.enum";
import { useAuthorization } from "../../../hooks/store/useAuthorization";
import { MessagesEntity, getConversation } from "../../../requests/messages";
import { UserEntity } from "../../../requests/user";
import { TextingArea } from "../TextingArea";
import UserPhoto from "@components/UserPhoto";

interface ConversationAreaProps {
  selectedUser: UserEntity;
  addMessageCount: (chattingWithId: string) => void;
  messagesCount: Map<string, number>;
}

export function ConversationArea({
  selectedUser,
  addMessageCount,
  messagesCount,
}: ConversationAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreItemsRef, inView } = useInView();
  const { user } = useAuthorization();

  const {
    data: dataConversation,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    any,
    unknown,
    { messagesBetweenUsers: MessagesEntity[]; count: number; offset: number }
  >({
    refetchOnWindowFocus: false,
    enabled: !!selectedUser,
    queryKey: [EQueries.conversation, selectedUser.id],

    queryFn: ({ pageParam = messagesCount.get(selectedUser.id) ?? 0 }) =>
      getConversation({ pageParam, limit: 15, userId: selectedUser.id }),
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + 15 > lastPage.count) {
        return undefined;
      }

      return lastPage.offset + 15 + (messagesCount.get(selectedUser.id) ?? 0);
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const conversation = (dataConversation?.pages || []).reduce<MessagesEntity[]>(
    (acc, next) => [...acc, ...next.messagesBetweenUsers],
    []
  );

  useEffect(() => {
    if (conversation.length <= 15 || !inView) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [conversation.length]);

  return (
    <VStack width="100%">
      <Conversation>
        <Content>
          <div style={{ padding: "1px" }} ref={scrollRef}></div>
          {conversation.map((message) => (
            <HStack
              key={message.id}
              alignSelf={message.fromUserId === user?.id ? "flex-end" : ""}
              width="40%"
              alignItems="end"
              gap="5px"
              position="relative"
            >
              {message.fromUserId !== user?.id && <UserPhoto size="30px" />}
              <ConversationMessage>
                <P1 overflowWrap="anywhere">{message.message}</P1>

                <Div position="absolute" bottom="2px" right="10px">
                  <XP>
                    {new Date(message.created_at).getHours()}:
                    {new Date(message.created_at).getMinutes() < 10 ? "0" : ""}
                    {new Date(message.created_at).getMinutes()}
                  </XP>
                </Div>
              </ConversationMessage>
            </HStack>
          ))}
          <Reloader ref={loadMoreItemsRef}>
            <FadeLoader color="#36d7b7" loading={isFetchingNextPage} />
            <Icon
              styles={{ fontSize: "36px", color: "purple" }}
              icon={CheckCircleOutlinedIcon}
              hide={hasNextPage}
            />
            {hasNextPage && !isFetchingNextPage && (
              <Button size="sm" onClick={() => fetchNextPage()}>
                Carregar mais
              </Button>
            )}
            {hasNextPage && <div style={{ height: "500px" }}></div>}
          </Reloader>
        </Content>
      </Conversation>

      <TextingArea selectedUser={selectedUser} updateRef={addMessageCount} />
    </VStack>
  );
}
