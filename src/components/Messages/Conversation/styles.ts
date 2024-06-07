import styled from "styled-components";
import { colors } from "../../../style/colors";

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
  background-color: #ccd5de;

  ${(props) => (props.$self ? "align-self: flex-end;" : "")}
`;

export const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
