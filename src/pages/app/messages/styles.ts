import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 10px;
`;

export const ListConversations = styled.div<{ $show: boolean }>`
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
  overflow-y: auto;
  min-width: 250px;
  @media (max-width: 1100px) {
    display: ${(props) => (props.$show ? "flex" : "none")};
  }
`;

export const ConversationItem = styled.div<{ highlight?: boolean }>`
  display: flex;
  height: 58px;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  align-items: center;
  gap: 15px;
  background-color: ${(props) =>
    props.highlight ? colors.gray[200] : "inherit"};

  body.dark & {
    background-color: ${(props) =>
      props.highlight ? colors.gray[600] : "inherit"};
  }
`;

export const MessagesWrapper = styled.div<{ expand: boolean }>`
  width: 100%;
  height: 100%;
  flex-direction: column;
  transition: width 0.3s, color 0.3s;

  @media screen and (max-width: 1100px) {
    display: ${(props) => (props.expand ? "flex" : "none")};
    position: absolute;
    background: #1e2730;
    height: 91.3%;

    z-index: 100;
  }
`;
