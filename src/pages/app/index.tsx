import Posts from "@components/Posts";
import { useState } from "react";
import { SectionContainer } from "./styles";
import { DivTab, Tab } from "@components/shared/Tabs";
import { HStack, VStack } from "@components/shared/flex/Stacks";
import { P1 } from "@components/shared/text/Paragraph";

export default function Index() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <SectionContainer>
      <HStack>
        <VStack width="740px">
          <DivTab sx={{ justifyContent: "space-evenly" }}>
            <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
              Para você
            </Tab>
            <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
              Seguindo
            </Tab>
          </DivTab>
          <Posts />
        </VStack>
        <VStack
          flex="1"
          justifyContent="center"
          alignItems="center"
          height="250px"
          overflow="hidden"
        >
          <VStack
            width="120px"
            height="80px"
            justifyContent="center"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="4px"
          >
            <P1 fontWeight="bold">Hanking</P1>
            <P1>#21</P1>
          </VStack>
        </VStack>
      </HStack>
    </SectionContainer>
  );
}
