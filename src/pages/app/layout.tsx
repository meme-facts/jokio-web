// import Header from "../components/Header";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import styled from "@emotion/styled";
import { useState } from "react";

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const FlexColumnContainer = styled.div`
  display: flex;
  border: 1px red solid;
  overflow: hidden;
  height: 100vh;
`;

const MaxWidthContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  padding: 1rem;
  margin-right: inherit;
`;
const Main = styled.main<{ isDrawerOpen?: boolean }>`
  align-self: center;
  display: flex;
  flex: 1;
  max-height: 100vh;
  overflow-y: scroll;
  margin-left: 48px;
  opacity: ${({ isDrawerOpen }) => (isDrawerOpen ? 0.5 : 1)};
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <FlexColumnContainer>
      {/* <Header toggleSidebar={handleMenuToggle} /> */}
      <Sidebar expandSidebar={isMenuOpen} onOpenDrawer={handleOpenDrawer} />
      <Main>{children}</Main>
    </FlexColumnContainer>
  );
}
