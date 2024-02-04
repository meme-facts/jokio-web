import { UserGrid } from "@components/Profile/UserGrid";
import { UserInfo } from "@components/Profile/UserInfo";
import { DivTab, Tab } from "@components/shared/Tabs";
import { HStack, VStack } from "@components/shared/flex/Stacks";
import { DivProfile, DivTabStyle } from "./styles";

export default function Profile() {
  return (
    <VStack>
      <DivTabStyle>
        <Tab active={true}>Publicações 32</Tab>
      </DivTabStyle>
      <DivProfile>
        <UserGrid />
        <UserInfo />
      </DivProfile>
    </VStack>
  );
}
