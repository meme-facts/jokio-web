import UserPhoto from "@components/UserPhoto";
import { VStack } from "@components/shared/flex/Stacks";
import { P2 } from "@components/shared/text/Paragraph";
import { useRouter } from "next/router";
import { useUserById } from "../../../hooks/requests/useUserById";
import { ProfileButton } from "../ProfileButton";
import { UserInfoSkeleton } from "./skeleton";
import { GridUserInfo } from "./styles";
import { useEffect, useState } from "react";

export function UserInfo() {
  const router = useRouter();
  const { nickname } = router.query;
  const { data, error, isLoading, isError, refetch } = useUserById(
    nickname as string
  );
  // useEffect(() => {
  //   refetch();
  // }, [nickname]);

  if (error || isLoading || !data) {
    return <UserInfoSkeleton />;
  }

  return (
    <VStack width="100%" justifyContent="start" alignItems="center" gap="10px">
      <VStack
        gap="20px"
        justifyContent="start"
        alignItems="center"
        maxWidth="250px"
      >
        <VStack
          gap="5px"
          height="130px"
          justifyContent="center"
          alignItems="center"
        >
          <UserPhoto imgUrl={data.img_full_url} size="70px" />
          <P2 fontWeight="500">@{data.nickname}</P2>
        </VStack>
        <GridUserInfo>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Seguindo</P2>
            <P2 fontWeight="500">{data.followingQuantity}</P2>
          </VStack>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Seguidores</P2>
            <P2 fontWeight="500">{data.followersQuantity}</P2>
          </VStack>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Likes</P2>
            <P2 fontWeight="500">1233213</P2>
          </VStack>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Dislikes</P2>
            <P2 fontWeight="500">3123</P2>
          </VStack>
        </GridUserInfo>
        <ProfileButton user={data} />
      </VStack>
    </VStack>
  );
}
