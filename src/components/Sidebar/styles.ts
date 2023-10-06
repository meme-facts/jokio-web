import styled from '@emotion/styled';
import Link from 'next/link';

export const SidebarWrapper = styled.div`
width: 13rem;

padding: 1rem;
position: fixed;
display:grid; 
left: 1.688rem;
top:100px;
height: 70%;
`;
export const MenuGroup = styled.div<{ isActive: boolean }>`
gap: 12px;
align-self: center;
text-decoration:none; 
display: flex;
padding:10px;
color:inherit;
border-radius: 10px;
${(props) => props.isActive && "color: #7A41E0;"}
&:hover {
    cursor:pointer;
    color: white;  
    background-color: #7A41E0; 
  }
`;
export const StyledLink = styled.a`
text-decoration: none; 
align-self:center;
font-weight: 500;
font-size: 16px; 
&:visited {
    color: inherit;
  }
&:hover {
    background-color: #7A41E0; 
  }
`;
export const Icon = styled.div`
font-size: 22px; 
align-self:center;

`;
export const Path = styled.path
    `
    fill: #27323D;
    body.dark & {
        fill: #CCD5DE; 
      }
`;
export const LogoLink = styled(Link)`
  flex-shrink: 0;
  position:fixed;
  top:43px;
  padding-left: 10px;
  fill:  red;
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

