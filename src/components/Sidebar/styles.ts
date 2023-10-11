import styled from '@emotion/styled';
import Link from 'next/link';

export const SidebarWrapper = styled.div`
width: 13rem;
color: black; 
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
color:black;
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
export const LogoLink = styled(Link)`
  flex-shrink: 0;
  position:fixed;
  top:43px;
  padding-left: 10px
`;