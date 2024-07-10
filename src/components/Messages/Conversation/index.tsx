import { Reloader } from "@components/Profile/UserGrid/styles";
import { Div, HStack, VStack } from "@components/shared/flex/Stacks";
import { Button } from "@components/shared/form/Button";
import { P, P1, XP } from "@components/shared/text/Paragraph";
import { FadeLoader } from "react-spinners";
import {
  Content,
  Conversation,
  ConversationMessage,
  MessageWrapper,
} from "./styles";

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
import { colors } from "../../../styles/colors";
import { useRouter } from "next/router";
import { formatDate, formatTime } from "@utils/functions/date";
import { ConversationSkeleton } from "./skeleton";

interface ConversationAreaProps {
  selectedUser: UserEntity;
  addMessageCount: (chattingWithId: string) => void;
  messagesCount: Map<string, number>;
  resetMessageCount: (userId: string) => void;
  isParentLoading?: boolean;
}

export function ConversationArea({
  selectedUser,
  addMessageCount,
  messagesCount,
  resetMessageCount,
  isParentLoading,
}: ConversationAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreItemsRef, inView } = useInView();
  const { user } = useAuthorization();
  const router = useRouter();
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
    staleTime: 1000 * 60 * 10,
    onSettled(data, error) {
      if (user) {
        const toUserId = data?.pages[0].messagesBetweenUsers[0].toUserId;
        const fromUserId = data?.pages[0].messagesBetweenUsers[0].fromUserId;
        const conversationWithId = toUserId === user.id ? fromUserId : toUserId;
        if (conversationWithId) {
          resetMessageCount(conversationWithId);
        }
      }
    },
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

  if (isLoading || isParentLoading) {
    return <ConversationSkeleton />;
  }

  return (
    <VStack width="100%">
      <Conversation>
        <Content>
          <div style={{ padding: "1px" }} ref={scrollRef}></div>
          {conversation.map((message, index) => {
            const messageDate = formatDate(message.created_at);
            const nextMessageDate =
              index + 1 < conversation.length
                ? formatDate(conversation[index + 1].created_at)
                : undefined;
            const showDate = messageDate !== nextMessageDate;
            return (
              <VStack key={message.id}>
                {showDate && (
                  <P padding="10px 0" alignSelf="center">
                    {messageDate}
                  </P>
                )}

                <MessageWrapper $self={message.fromUserId === user?.id}>
                  {message.fromUserId !== user?.id && (
                    <UserPhoto
                      cursor="pointer"
                      onClick={() =>
                        router.push(`/app/profile/${selectedUser.nickname}`)
                      }
                      size="30px"
                      imgUrl={selectedUser.img_full_url}
                    />
                  )}
                  <ConversationMessage>
                    <P1 overflowWrap="anywhere">{message.message}</P1>

                    <Div position="absolute" bottom="2px" right="10px">
                      <XP>{formatTime(message.created_at)}</XP>
                    </Div>
                  </ConversationMessage>
                </MessageWrapper>
              </VStack>
            );
          })}
          <Reloader ref={loadMoreItemsRef}>
            <FadeLoader color="#36d7b7" loading={isFetchingNextPage} />

            {hasNextPage && !isFetchingNextPage ? (
              <Button size="sm" onClick={() => fetchNextPage()}>
                Carregar mais
              </Button>
            ) : (
              <VStack gap="10px" alignItems="center">
                <Icon
                  styles={{ fontSize: "26px", color: colors.primary[500] }}
                  icon={CheckCircleOutlinedIcon}
                  hide={hasNextPage}
                />
                <Button
                  onClick={() =>
                    router.push(`/app/profile/${selectedUser.nickname}`)
                  }
                  borderRadius="10px"
                  padding="5px"
                  width="auto"
                  size="xm"
                  backgroundColor="inhered"
                >
                  Ver perfil
                </Button>
              </VStack>
            )}

            {hasNextPage && <div style={{ height: "100px" }}></div>}
          </Reloader>
        </Content>
      </Conversation>

      <TextingArea selectedUser={selectedUser} updateRef={addMessageCount} />
    </VStack>
  );
}
