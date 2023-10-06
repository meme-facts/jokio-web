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
  @media (min-width: 768px) {
    padding-left: 7rem;
    padding-right: 22rem;
  }
  @media (min-width: 1536px) {
    padding: 44px;
  }
`;


export const SearchForm = styled.form`
  position: relative;
  width: 100%;
  justify-content: center; 
  display: flex;
  @media (min-width: 640px) {
    margin-left: 16px;
  }
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
  
`;
export const SearchIconWrapper = styled.div`
  position: absolute;
  color:#27323d;
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
// export export const StyledHeader = styled.input`
//   max-width: calc(100% - 15px);
//   height: 100%;
//   border-radius: 10px;
//   border: 1px solid #384757;
//   padding-left: 10px;
//   ${(props) =>
//     Object.keys(props).map((name) => {
//       return {
//         [name]:
//           props[name as keyof React.InputHTMLAttributes<HTMLInputElement>],
//       };
//     })};
// `;

// const Container = styled.div<React.InputHTMLAttributes<HTMLInputElement>>`
//   width: ${(props) => props.width};
//   min-width: ${(props) => props.width};
//   min-height: ${(props) => props.height};
// `;

// export const FormLabel = styled.label`
//   padding: 15px 0;
// `;

// export const Label = styled.p``;

// export const InputGroup = styled.div`
//   width: 100%;
//   height: 100%;
// `;

// export { Container };