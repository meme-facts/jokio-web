// import Header from "../components/Header";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import { HStack } from "@components/shared/flex/Stacks";
import styled from "@emotion/styled";
import router from "next/router";
import { useEffect, useState } from "react";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import { isTokenValid } from "../../utils/functions/isTokenValid";
import { socket } from "../../services/socket";

const Wrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  max-height: 100vh;
  height: 100vh;
`;
const Main = styled.main`
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
  @media (max-width: 1100px) {
    padding: 30px 0;
  }
`;
export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthorization();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // function onConnect() {
    //   setIsConnected(true);
    // }

    // function onDisconnect() {
    //   setIsConnected(false);
    // }

    // socket.on("connection", onConnect);
    // socket.on("disconnect", onDisconnect);
    socket.connect();

    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
    };
  }, []);
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
