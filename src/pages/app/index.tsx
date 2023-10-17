import { useState, useEffect } from 'react';
import { SectionContainer, Tab, DivTab } from './styles';
import Posts from '@components/Posts';
import { JokioBackend } from '../../services/api';

export default function Index() {
  const [activeTab, setActiveTab] = useState('Para você');
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <SectionContainer>
      <DivTab>
        <Tab onClick={() => handleTabClick('Para você')} isActive={activeTab === 'Para você'}>Para você</Tab>
        <Tab onClick={() => handleTabClick('Seguindo')} isActive={activeTab === 'Seguindo'}>Seguindo</Tab>
      </DivTab>
      <Posts />
    </SectionContainer>
  );
}
