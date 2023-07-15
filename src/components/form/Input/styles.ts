import { styled } from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #384757;
  padding-left: 10px;
`;

const Container = styled.div<React.InputHTMLAttributes<HTMLInputElement>>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const FormLabel = styled.label``;

export const Label = styled.p``;

export const InputGroup = styled.div`
  width: 100%;
  height: 100%;
`;

export { Container };
