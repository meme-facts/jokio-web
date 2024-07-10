import { UserGrid } from "@components/Profile/UserGrid";
import { UserInfo } from "@components/Profile/UserInfo";
import { DivTab, Tab } from "@components/shared/Tabs";
import { HStack, VStack } from "@components/shared/flex/Stacks";

export default function Profile() {
  return (
    <VStack>
      <HStack
        alignItems="start"
        width="100%"
        padding="20px"
        paddingTop="25px"
        md={{
          flexDirection: "column-reverse",
          padding: "0",
          alignItems: "center",
        }}
      >
        <UserGrid />
        <UserInfo />
      </HStack>
    </VStack>
  );
}
