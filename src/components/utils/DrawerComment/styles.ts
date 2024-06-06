import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const Root = styled.div`
  height: 100%;
`;

export const StyledBox = styled(Box)`
  background-color: #fff;
  body.dark & {
    background-color: #1e2730;
  }
`;

export const Puller = styled(Box)`
  width: 30;
  height: 6;
  background-color: #fff;
  border-radius: 3;
  position: "absolute";
  top: 8;
  left: "calc(50% - 15px)";
`;
export const Title = styled(Typography)`
  padding: 17px;
  color: #000;
  body.dark & {
    color: #fff;
  }
`;
