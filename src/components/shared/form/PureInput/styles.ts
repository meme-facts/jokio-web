import { InputHTMLAttributes } from "react";
import styled, { CSSProperties } from "styled-components";

export type PureInputType = CSSProperties &
  InputHTMLAttributes<HTMLInputElement>;

export const StyledPureInput = styled.input<{ sx: PureInputType }>`
  padding-left: 5px;
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof PureInputType],
      };
    })};
  body.dark & {
    border: 1px solid #ccd5de;
    ${(props) =>
      Object.keys(props.sx).map((name) => {
        return {
          [name]: props.sx[name as keyof PureInputType],
        };
      })};
  }
  &:disabled {
    filter: brightness(0.8);
  }
  &:focus {
    outline: none;
    box-shadow: 0 1px 0 0 blue;
  }
  transition: filter 0.2s;
`;
