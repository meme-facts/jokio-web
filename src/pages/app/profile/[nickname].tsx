import { UserGrid } from "@components/Profile/UserGrid";
import { UserInfo } from "@components/Profile/UserInfo";
import { DivTab, Tab } from "@components/shared/Tabs";
import { HStack, VStack } from "@components/shared/flex/Stacks";

export default function Profile() {
  return (
    <VStack>
      <DivTab>
        <Tab active={true}>Publicações 32</Tab>
      </DivTab>
      <HStack alignItems="start" width="100%" paddingTop="25px">
        <UserGrid />
        <UserInfo />
      </HStack>
    </VStack>
  );
}
