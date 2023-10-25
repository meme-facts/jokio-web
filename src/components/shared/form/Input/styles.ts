import { CSSProperties } from "react";
import styled from "@emotion/styled";

export type InputType = CSSProperties &
  React.InputHTMLAttributes<HTMLInputElement>;

export const StyledInput = styled.input<{ sx: InputType }>`
  max-width: calc(100% - 15px);
  height: 100%;
  border-radius: 10px;
  border: 1px solid #384757;
  padding-left: 10px;
  body.dark & {
    background-color: #171D24; 
    border: 1px solid #CCD5DE;
    color: #ffffff;
  }
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof InputType],
      };
    })};
`;

const Container = styled.div<{ sx: InputType }>`
  width: ${(props) => props.sx.width};
  min-width: ${(props) => props.sx.width};
  min-height: ${(props) => props.sx.height};
`;

export const FormLabel = styled.label`
  padding: 15px 0;
`;

export const Label = styled.p``;

export const InputGroup = styled.div`
  width: 100%;
  height: 100%;
`;

export { Container };
