import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  position: sticky;
  width: 80%;
  z-index: 100;
  align-self: self-end;
  padding: 16px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

export const BorderBottom = styled.div`
  border-bottom: 1px solid #e6e6e6;
  height: 60px;
`;

export const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  padding-left: 8rem;
  padding-right: 16rem;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 1536px) {
    padding: 44px;
  }
`;
export const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;
  border-radius: 10px;
  fill: white;
  color: white;
  border: none;
  background-color: #7a41e0;
  outline: none;
  width: 35px;
  font-size: larger;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  left: ${({ isOpen }) => (isOpen ? "190px" : "10px")};
  justify-content: center;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const SearchForm = styled.form`
  position: relative;
  width: 100%;
  justify-content: center;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  color: var(--Gray-300, #abbbcc);
  border-radius: 11px;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 150%; /* 21px */
  letter-spacing: 0.1px;
  height: 40px;
  border: 1px solid #27323d;
  background: #e8e9eb;
  padding-left: 20px;
  padding-right: 16px;
  font-weight: 500;


  outline: none;
  body.dark & {
    background-color: #27323d;
    border: 1px solid #ccd5de;
  }
`;
export const SearchIconWrapper = styled.div`
  position: absolute;
  color: inherit;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
export const TestHeaderWrapper = styled.div`
  display: flex;
  padding-right: 20px;
  color: #27323d;
  gap: 2.4rem;
  align-items: center;
`;

export const Switch = styled.input`
  position: relative;
  height: 1.2rem;
  width: 2.3rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 9999px;
  background-color: #a8a8a8;
  transition: all 0.3s ease;

  &:checked {
    background-color: #7a41e0;
  }

  &::before {
    position: absolute;
    content: "";
    left: calc(1.5rem - 1.6rem);
    top: calc(1.5rem - 1.6rem);
    display: block;
    height: 1.2rem;
    width: 1.2rem;
    cursor: pointer;
    border: 1px solid #502a93;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 3px 10px rgba(100, 116, 139, 0.327);
    transition: all 0.3s ease;
  }

  &:hover::before {
    box-shadow: 0 0 0px 8px rgba(0, 0, 0, 0.15);
  }

  &:checked:hover::before {
    box-shadow: 0 0 0px 8px rgba(236, 72, 153, 0.15);
  }

  &:checked::before {
    transform: translateX(100%);
    border-color: rgba(236, 72, 153, 1);
  }
`;
