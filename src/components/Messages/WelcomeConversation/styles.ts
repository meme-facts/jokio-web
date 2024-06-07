import { colors } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 100px);
  width: 100%;
  border: 1px solid ${colors.purple[200]};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px;
`;
