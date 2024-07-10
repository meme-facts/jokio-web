import { ConversationArea } from "@components/Messages/Conversation";
import UserPhoto from "@components/UserPhoto";
import { HStack, VStack } from "@components/shared/flex/Stacks";
import { P, P1, P2 } from "@components/shared/text/Paragraph";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useQueryConversations } from "../../../hooks/requests/messages/useQueryConversations";
import { useAuthorization } from "../../../hooks/store/useAuthorization";
import { UserEntity } from "../../../requests/user";
import {
  Container,
  ConversationItem,
  ListConversations,
  MessagesWrapper,
} from "./styles";
import { socket } from "../../../services/socket";
import { useUpdateConversationData } from "../../../hooks/requests/messages/useUpdateConversationData";
import { MessagesEntity } from "../../../requests/messages";
import { H6 } from "@components/shared/text/Heading";
import { WelcomeConversation } from "@components/Messages/WelcomeConversation";
import { NewConversationModal } from "@components/Messages/NewConversationModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Icon from "@components/shared/Icon";
import { colors } from "../../../styles/colors";
import { useRouter } from "next/router";
import { useUserById } from "@hooks/requests/useUserById";
import { characterLimiter } from "@utils/functions/characterLimiter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MessagesSkeleton } from "./skeleton";

export default function Messages() {
  const router = useRouter();

  const { user } = router.query;
  const { data: dataAllConversations, isLoading: loadingAllConversations } =
    useQueryConversations();

  const { updateAll } = useUpdateConversationData();
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const messagesCount = useRef<Map<string, number>>(new Map());

  const { data, isLoading: loadingUser } = useUserById(
    user as string | undefined
  );
  const selectedUser: UserEntity | undefined = data && {
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    full_name: data.full_name,
    img_full_url: data.img_full_url,
  };
  const addMessageCount = useCallback(
    (chattingWithId: string) => {
      const currentCount = messagesCount.current.get(chattingWithId) ?? 0;
      messagesCount.current.set(chattingWithId, currentCount + 1);
    },
    [messagesCount]
  );
  const resetMessageCount = useCallback(
    (chattingWithId: string) => {
      messagesCount.current.set(chattingWithId, 0);
    },
    [messagesCount]
  );

  useEffect(() => {
    socket.on("private_message", (data: MessagesEntity) => {
      if (selectedUser?.id) {
        if (selectedUser) {
          addMessageCount(data.fromUserId);
          updateAll(data, data.fromUser);
        }
      }
    });
    return () => {
      socket.off("private_message");
    };
  }, [socket, selectedUser?.id, addMessageCount, updateAll]);

  const isLoading = loadingUser || loadingAllConversations;

  return (
    <VStack width="100%" height="100%">
      <HStack
        width="250px"
        justifyContent="space-between"
        gap="10px"
        md={{ width: "100%" }}
      >
        <HStack alignItems="center">
          {selectedUser && (
            <Icon
              styles={{
                fontSize: "20px",
                color: colors.gray[200],
                cursor: "pointer",
              }}
              icon={ArrowBackIcon}
              onClick={() => router.push({ query: undefined })}
            />
          )}

          <H6 color={colors.gray[200]} fontWeight="500">
            Mensagens
          </H6>
        </HStack>
        <Icon
          styles={{
            fontSize: "26px",
            color: colors.gray[200],
            cursor: "pointer",
          }}
          icon={AddCircleOutlineIcon}
          onClick={() => setIsOpen(true)}
        />
        <NewConversationModal
          isOpen={isOpen}
          handleCloseModal={() => setIsOpen(false)}
        />
      </HStack>
      <Container>
        <ListConversations $show={!selectedUser}>
          {isLoading ? (
            <MessagesSkeleton />
          ) : (
            dataAllConversations?.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                highlight={
                  conversation.chattingWith.id === selectedUser?.id ?? false
                }
                onClick={() =>
                  router.push({
                    query: {
                      user: conversation.chattingWith.nickname,
                    },
                  })
                }
              >
                <UserPhoto
                  imgUrl={conversation.chattingWith.img_full_url}
                  size="50px"
                />
                <VStack padding="5px" gap="3px" width="calc(100% - 80px)">
                  <P2 fontWeight="500">
                    @{characterLimiter(17, conversation.chattingWith.nickname)}
                  </P2>
                  <P
                    whiteSpace="nowrap"
                    overflow="hidden"
                    maxWidth="100%"
                    width="fit-content"
                  >
                    {characterLimiter(14, conversation.message)}
                  </P>
                </VStack>
              </ConversationItem>
            ))
          )}
        </ListConversations>

        <HStack width="100%" md={{ display: selectedUser ? "flex" : "none" }}>
          {selectedUser ? (
            <ConversationArea
              selectedUser={selectedUser}
              addMessageCount={addMessageCount}
              messagesCount={messagesCount.current}
              resetMessageCount={resetMessageCount}
              isParentLoading={isLoading || !selectedUser}
            />
          ) : (
            <WelcomeConversation />
          )}
        </HStack>
      </Container>
    </VStack>
  );
}
