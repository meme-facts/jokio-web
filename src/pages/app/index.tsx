import Posts from "@components/Posts";
import { useState } from "react";
import { SectionContainer } from "./styles";
import { DivTab, Tab } from "@components/shared/Tabs";

export default function Index() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <SectionContainer>
      <DivTab sx={{ justifyContent: "space-evenly" }}>
        <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
          Para você
        </Tab>
        <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
          Seguindo
        </Tab>
      </DivTab>
      <Posts />
    </SectionContainer>
  );
}
