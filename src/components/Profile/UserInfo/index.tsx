import UserPhoto from "@components/UserPhoto";
import { VStack } from "@components/shared/flex/Stacks";
import { GridUserInfo } from "./styles";
import { P2 } from "@components/shared/text/Paragraph";
import { ProfileButton } from "../ProfileButton";
import { FollowerStatusEnum } from "../../../enum/FollowerStatusEnum";
import { useUserById } from "../../../hooks/requests/useUserById";
import { useRouter } from "next/router";
import { LoadingOrErrorScreen } from "@components/shared/feedback/LoadingOrErrorScreen";
import { UserInfoSkeleton } from "./skeleton";

export function UserInfo() {
  const router = useRouter();
  const { nickname } = router.query;
  const { data, error, isLoading, isError } = useUserById(nickname as string);

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
          <UserPhoto size="70px" />
          <P2 fontWeight="500">@{data?.nickname}</P2>
        </VStack>
        <GridUserInfo>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Seguindo</P2>
            <P2 fontWeight="500">{data?.followingQuantity}</P2>
          </VStack>
          <VStack gap="5px" justifyContent="center" alignItems="center">
            <P2 fontWeight="500">Seguidores</P2>
            <P2 fontWeight="500">{data?.followersQuantity}</P2>
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
