import { P2 } from "@components/shared/text/Paragraph";
import styled from "@emotion/styled";

export const PostInput = styled.textarea`
  width: 100%;
  margin-left: 10px;
  color: #000;
  font-size: 14px;
  border-radius: 11px;
  height: 60px;
  border: 1px solid #27323d;
  background: #e8e9eb;
  padding: 10px 16px 0px 20px;
  outline: none;
  resize: none;
  font-family: var(--inter-font);
`;
export const ActionButtons = styled.div`
  display: grid;
  margin-left: 10px;
  gap: 10px;
  width: 85px;
`;

export const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyledP2 = styled(P2)`
  width: 20%;
  text-align: center;
`;
