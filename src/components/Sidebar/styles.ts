import styled from "@emotion/styled";
import Link from "next/link";

export const SidebarWrapper = styled.div`
  width: 13rem;
  color: black;
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow-y: hidden;
  gap: 45px;
`;
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const MenuGroup = styled.div<{ active: boolean }>`
  gap: 20px;
  text-decoration: none;
  display: flex;

  padding: 10px;
  color: black;
  border-radius: 10px;
  ${(props) => props.active && "color: #7A41E0;"}
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #7a41e0;
  }
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
export const Icon = styled.div`
  font-size: 22px;
  align-self: center;
`;
export const LogoLink = styled(Link)`
  padding-left: 10px;
`;
