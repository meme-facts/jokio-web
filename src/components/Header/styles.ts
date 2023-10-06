import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  position: sticky;
  width: 80%;
  z-index: 100;
  align-self: self-end;
  padding: 16px;
`;

export const HeaderContainer = styled.div`
  padding: 16px;
  display:flex;
  padding-left: 7rem;
  padding-right: 22rem;
  
  @media (min-width: 1536px) {
    padding: 44px;
  }
`;

export const SearchForm = styled.form`
  position: relative;
  width: 100%;
  justify-content: center; 
  display: flex;
  
 
`;


export const SearchInput = styled.input`
  width: 100%;
  color: var(--Gray-300, #ABBBCC);
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
    background-color: #27323D; 
    border: 1px solid #CCD5DE;
  }
  
`;
export const SearchIconWrapper = styled.div`
  position: absolute;
  color:inherit;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
export const TestHeaderWrapper = styled.div`
display: flex; 
padding-right: 20px;
color:#27323d;
gap: 2.4rem;    
align-items: center; 
`;

export const Switch = styled.input`
  position: relative;
  height: 1.5rem;
  width: 3rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 9999px;
  background-color: rgba(100, 116, 139, 0.377);
  transition: all .3s ease;

  &:checked {
    background-color: rgba(236, 72, 153, 1);
  }

  &::before {
    position: absolute;
    content: "";
    left: calc(1.5rem - 1.6rem);
    top: calc(1.5rem - 1.6rem);
    display: block;
    height: 1.6rem;
    width: 1.6rem;
    cursor: pointer;
    border: 1px solid rgba(100, 116, 139, 0.527);
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 3px 10px rgba(100, 116, 139, 0.327);
    transition: all .3s ease;
  }

  &:hover::before {
    box-shadow: 0 0 0px 8px rgba(0, 0, 0, .15)
  }

  &:checked:hover::before {
    box-shadow: 0 0 0px 8px rgba(236, 72, 153, .15)
  }

  &:checked::before {
    transform: translateX(100%);
    border-color: rgba(236, 72, 153, 1);
  }
`;