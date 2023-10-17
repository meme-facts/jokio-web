// import Header from "../components/Header";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import styled from '@emotion/styled';
import { useState } from "react";

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const FlexColumnContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

`;

const MaxWidthContainer = styled.div`
margin: auto;
width: 100%;
display: flex;
padding: 1rem;
margin-right: inherit;
`;
const Main = styled.main<{ isDrawerOpen?: boolean }>`
width: 57%;
align-self: center;
display: flex;
margin-left: 48px;
opacity: ${({ isDrawerOpen }) => isDrawerOpen ? 0.5 : 1};
@media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
}

`;

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleOpenDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleMenuToggle() {
        setIsMenuOpen(!isMenuOpen);
    }
    return (

        <div>
            <FlexContainer>
                <FlexColumnContainer >
                    <Header toggleSidebar={handleMenuToggle} />
                    <Sidebar expandSidebar={isMenuOpen} onOpenDrawer={handleOpenDrawer} />
                    <Main>
                        <MaxWidthContainer>
                            {children}
                        </MaxWidthContainer>
                    </Main>
                </FlexColumnContainer>
            </FlexContainer>
        </div>
    );
}
