import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  border: 1px solid ${colors.purple[200]};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px;
  @media (max-width: 720px) {
    border: none;
    padding: 0;
  }
`;

export const Content = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: start;
  gap: 10px;
`;

export const ConversationMessage = styled.div<{ $self?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: ${colors.gray[200]};
  body.dark & {
    color: white;
    background-color: ${colors.gray[600]};
  }

  ${(props) => (props.$self ? "align-self: flex-end;" : "")}
`;

export const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const MessageWrapper = styled.div<{ $self: boolean }>`
  display: flex;
  align-self: ${(props) => (props.$self === true ? "flex-end" : "")};
  width: 40%;
  align-items: end;
  gap: 5px;
  position: relative;

  @media (max-width: 1100px) {
    width: 85%;
  }
`;
