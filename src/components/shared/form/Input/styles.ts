import { CSSProperties } from "react";
import styled from "@emotion/styled";

export type InputType = CSSProperties &
  React.InputHTMLAttributes<HTMLInputElement>;

export type focus = React.FocusEvent;

export const StyledInput = styled.input<{ sx: InputType; error: boolean }>`
  max-width: calc(100% - 15px);
  height: 100%;
  border-radius: 10px;
  border: ${(props) => (!props.error ? "1px solid #384757" : "1px solid #red")};
  padding-left: 10px;
  body.dark & {
    background-color: #171d24;
    border: ${(props) =>
      !props.error ? "1px solid #ccd5de" : "1px solid red"};
    color: #ffffff;
  }
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof InputType],
      };
    })};
  &:focus {
    outline: none;
    box-shadow: 0 1px 0 0 blue;
  }
`;

const Container = styled.div<{ sx: InputType }>`
  width: ${(props) => props.sx.width};
  min-width: ${(props) => props.sx.width};
  min-height: ${(props) => props.sx.height};
  position: relative;
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
