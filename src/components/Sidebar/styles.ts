import styled from "@emotion/styled";
import Link from "next/link";

export const SidebarWrapper = styled.div<{ expand: boolean }>`
  width: 13rem;
  color: black;
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-y: hidden;
  gap: 45px;
  transition: width 0.3s, color 0.3s;

  @media screen and (max-width: 750px) {
    display: ${(props) => (props.expand ? "flex" : "none")};
    position: absolute;
    background: #1e2730;
    height: 91.3%;
    z-index: 100;
  }
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
  /* color: white; */
  border-radius: 10px;
  color: ${(props) => (props.active ? "#7A41E0" : "white")};
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
  height: 25px !important;
  align-self: center;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  padding-left: 10px;
`;
export const ButtonExpand = styled.button<{ expand: boolean }>`
  display: ${(props) => (props.expand ? "none" : "flex")};
  border-radius: 5px;
  background-color: blueviolet;
  border: none;
  color: white;
  margin: 10px 10px;
  font-size: 19px;
  @media screen and (min-width: 751px) {
    display: none;
  }
  position: absolute;
  height: fit-content;
  z-index: 10000;
`;
export const ButtonHidden = styled.button`
  @media screen and (min-width: 751px) {
    display: none;
  }
  display: flex;
  justify-items: center;
  border-radius: 5px;
  background-color: blueviolet;
  border: none;
  color: white;
  margin: 10px 10px;
  font-size: 19px;
  width: fit-content;
  height: fit-content;
  z-index: 10000;
  position: absolute;
  top: 0;
  right: 0;
`;
