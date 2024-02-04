import styled from "@emotion/styled";
import { Icon } from "@mui/material";
import Link from "next/link";

export const NavbarDiv = styled.div`
  background-color: #7a41e0;
  height: 7%;
  width: 100%;
  bottom: 0;
  position: absolute;
  display: none;
  grid-auto-flow: column;
  justify-items: center;
  @media screen and (max-width: 750px) {
    display: grid;
  }
`;

export const IconMenu = styled(Icon)<{ active: boolean }>`
  font-size: 35px;
  align-self: center;
  color: ${(props) => (props.active ? "#000" : "#fff")};
  align-items: center;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  align-self: center;
  font-weight: 500;
  font-size: 16px;
  color: inherit;

  &:visited {
    color: inherit;
  }
  &:hover {
    background-color: #7a41e0;
  }
`;
