// import Header from "../components/Header";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import { HStack } from "@components/shared/flex/Stacks";
import styled from "@emotion/styled";
import router from "next/router";
import { useEffect } from "react";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import { isTokenValid } from "../../utils/functions/isTokenValid";

const Wrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  max-height: 100vh;
`;
const Main = styled.main`
  height: 100vh;
  padding: 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;
const MaxWidth = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 34px;
`;
export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthorization();
  useEffect(() => {
    if (!isTokenValid(user)) {
      router.push("/");
    }
  }, []);
  return (
    <Wrapper>
      <Sidebar />
      <Main>
        <MaxWidth>{children}</MaxWidth>
      </Main>
    </Wrapper>
  );
}
