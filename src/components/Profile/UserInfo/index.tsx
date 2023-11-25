import UserPhoto from "@components/UserPhoto";
import { VStack } from "@components/shared/flex/Stacks";
import { GridUserInfo } from "./styles";
import { P2 } from "@components/shared/text/Paragraph";

export function UserInfo() {
  return (
    <VStack width="100%" justifyContent="start" alignItems="center" gap="10px">
      <VStack
        gap="5px"
        height="130px"
        justifyContent="center"
        alignItems="center"
      >
        <UserPhoto size="70px" />
        <P2 fontWeight="500">@gabekf</P2>
      </VStack>
      <GridUserInfo>
        <VStack gap="5px" justifyContent="center" alignItems="center">
          <P2 fontWeight="500">Seguindo</P2>
          <P2 fontWeight="500">123</P2>
        </VStack>
        <VStack gap="5px" justifyContent="center" alignItems="center">
          <P2 fontWeight="500">Seguidores</P2>
          <P2 fontWeight="500">1123</P2>
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
    </VStack>
  );
}
