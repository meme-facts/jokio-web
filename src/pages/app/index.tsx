import { useState } from 'react';
import { SectionContainer, Tab, DivTab } from './styles';
import Posts from '@components/Posts';

export default function Index() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <SectionContainer>
      <DivTab>
        <Tab onClick={() => handleTabClick(1)} isActive={activeTab === 1}>Para você</Tab>
        <Tab onClick={() => handleTabClick(2)} isActive={activeTab === 2}>Seguindo</Tab>
      </DivTab>
      <Posts />
    </SectionContainer>
  );
}
