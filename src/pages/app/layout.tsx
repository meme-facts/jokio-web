// import Header from "../components/Header";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import styled from '@emotion/styled';


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
const Main = styled.main`
width: 57%;
align-self: center;
display: flex;
margin-left: 48px;
`;
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <FlexContainer>
                <FlexColumnContainer>
                    <Header />
                    <Sidebar />
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
