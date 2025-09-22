import { HStack, VStack } from "@components/shared/flex/Stacks";
import { Input } from "@components/shared/form/Input";
import Modal from "@components/utils/Modal/Modal";
import { colors } from "../../../styles/colors";
import { PureInput } from "@components/shared/form/PureInput";
import { P, P1 } from "@components/shared/text/Paragraph";

import CloseIcon from "@mui/icons-material/Close";
import Icon from "@components/shared/Icon";
import UserPhoto from "@components/UserPhoto";
import { useInfiniteQuery } from "react-query";
import { getFollowing } from "@requests/messages";
import { useCallback, useEffect, useState } from "react";
import { UserEntity } from "@requests/user";
import { useInView } from "react-intersection-observer";
import { EQueries } from "@enums/reactQueryTags/queries.enum";
import { debounce } from "@mui/material";
import { NewConversationModalSkeleton } from "./skeleton";
import { useRouter } from "next/router";

interface NewConversationModalProps {
  handleCloseModal: () => void;
  isOpen: boolean;
}

export function NewConversationModal({
  isOpen,
  handleCloseModal,
}: NewConversationModalProps) {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 700),
    [] // Ensure it is created only once
  );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<
    any,
    unknown,
    { users: UserEntity[]; count: number; prevPage: number }
  >({
    queryKey: [EQueries.getFollowing, search],
    queryFn: ({ pageParam = 1 }) =>
      getFollowing({ pageParam, limit: 6, user_reference: search }),
    getNextPageParam: (lastPage) => {
      if (lastPage.prevPage * 6 + 1 > lastPage.count) {
        return false;
      }
      return lastPage.prevPage + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    } else {
      refetch();
    }
  }, [isOpen, refetch]);

  function selectUser(nickname: string) {
    handleCloseModal();
    router.push({
      query: {
        user: nickname,
      },
    });
  }

  const users = (data?.pages || []).reduce<UserEntity[]>(
    (acc, next) => (next.users ? [...acc, ...next.users] : [...acc]),
    []
  );
  if (isLoading) {
    return (
      <Modal
        width="500px"
        height="530px"
        onClosed={handleCloseModal}
        opened={isOpen}
      >
        <NewConversationModalSkeleton />
      </Modal>
    );
  }
  return (
    <Modal
      width="500px"
      height="530px"
      onClosed={handleCloseModal}
      opened={isOpen}
    >
      <VStack width="100%" padding="25px" gap="10px">
        <HStack justifyContent="space-between">
          <P1 fontWeight="500">Nova Mensagem</P1>
          <Icon
            styles={{
              fontSize: "24px",
              color: colors.gray[200],
              cursor: "pointer",
            }}
            icon={CloseIcon}
            onClick={handleCloseModal}
          />
        </HStack>
        <PureInput
          placeholder="Busque amigos..."
          border="none"
          backgroundColor="inherit"
          borderBottom={`1px solid ${colors.purple[200]}`}
          borderRadius="0px"
          marginBottom="5px"
          height="35px"
          padding="5px"
          color={colors.gray[200]}
          value={search}
          onChange={(e: any) => debouncedSearch(e.target.value)}
        />
        <VStack maxHeight="100%" overflow="auto">
          {users.map((user, i) => (
            <HStack
              key={user.id}
              padding="10px"
              gap="10px"
              alignItems="center"
              cursor="pointer"
              _hover={{ backgroundColor: colors.gray[600] }}
              onClick={() => selectUser(user.nickname)}
            >
              <UserPhoto imgUrl={user.img_full_url} size="50px" />
              <VStack gap="2px">
                <P1 fontWeight="bold">@{user.nickname}</P1>
                <P>{user.full_name}</P>
              </VStack>
            </HStack>
          ))}
          <div style={{ height: "200px" }} ref={ref} />
        </VStack>
      </VStack>
    </Modal>
  );
}
