import { ConversationArea } from "@components/Messages/Conversation";
import UserPhoto from "@components/UserPhoto";
import { HStack, VStack } from "@components/shared/flex/Stacks";
import { P, P1, P2 } from "@components/shared/text/Paragraph";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useQueryConversations } from "../../../hooks/requests/messages/useQueryConversations";
import { useAuthorization } from "../../../hooks/store/useAuthorization";
import { UserEntity } from "../../../requests/user";
import { Container, ListConversations } from "./styles";
import { socket } from "../../../services/socket";
import { useUpdateConversationData } from "../../../hooks/requests/messages/useUpdateConversationData";
import { MessagesEntity } from "../../../requests/messages";
import { H6 } from "@components/shared/text/Heading";
import { WelcomeConversation } from "@components/Messages/WelcomeConversation";

export default function Messages() {
  const { data: dataAllConversations } = useQueryConversations();
  const [selectedUser, setSelectedUser] = useState<UserEntity | undefined>();
  const { updateData } = useUpdateConversationData();
  const addedMessagesCount = useRef<Map<string, number>>(new Map());
  useEffect(() => {
    setSelectedUser(dataAllConversations?.[0]?.chattingWith);
  }, []);

  const addMessageCount = useCallback(
    (chattingWithId: string) => {
      addedMessagesCount.current.set(
        chattingWithId,
        (addedMessagesCount.current.get(chattingWithId) ?? 0) + 1
      );
    },
    [addedMessagesCount]
  );

  useEffect(() => {
    socket.on("private_message", (data: MessagesEntity) => {
      if (selectedUser?.id) {
        if (selectedUser) {
          addMessageCount(data.fromUserId);
          updateData(data, data.fromUser);
        }
      }
    });
    return () => {
      socket.off("private_message");
    };
  }, [socket, selectedUser?.id]);

  return (
    <VStack width="100%" height="100%">
      <H6 fontWeight="500">Mensagens</H6>
      <Container>
        <ListConversations>
          {dataAllConversations?.map((conversation) => (
            <HStack
              key={conversation.id}
              onClick={() => setSelectedUser(conversation.chattingWith)}
              height="68px"
              borderRadius="5px"
              backgroundColor={
                conversation.chattingWith.id === selectedUser?.id
                  ? "#CCD5DE"
                  : "inherit"
              }
              cursor="pointer"
              padding="5px"
              alignItems="center"
              gap="15px"
            >
              <UserPhoto size="50px" />
              <VStack padding="5px" gap="3px" width="calc(100% - 80px)">
                <P2 fontWeight="500">@{conversation.chattingWith.nickname}</P2>
                <P
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="100%"
                  width="fit-content"
                >
                  {conversation.message}
                </P>
              </VStack>
            </HStack>
          ))}
        </ListConversations>
        {selectedUser ? (
          <ConversationArea
            selectedUser={selectedUser}
            addMessageCount={addMessageCount}
            messagesCount={addedMessagesCount.current}
          />
        ) : (
          <WelcomeConversation />
        )}
      </Container>
    </VStack>
  );
}
