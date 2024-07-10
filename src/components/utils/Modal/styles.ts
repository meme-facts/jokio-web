import { Box } from "@mui/material";
import styled from "styled-components";

interface CustomizedBoxProps {
  width?: string;
  height?: string;
}

export const CustomizedBox = styled(Box)<CustomizedBoxProps>`
  font-family: Inter, sans-serif;
  position: absolute;
  width: ${(props) => props.width ?? "50%"};
  max-height: ${(props) => props.height ?? "90%"};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 24;
  padding: 4px;
  display: flex;
  background-color: #fff;
  border: none;
  outline: none;
  body.dark & {
    background-color: #1e2730;
  }

  @media (max-width: 1100px) {
    width: 100vw;
    height: 100vh;
  }
`;
