import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from "react";
import styled from "@emotion/styled";
import { BaseObject } from "styled-components/dist/types";

export type IButtonType = CSSProperties &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const StyledButton = styled.button<{ sx: IButtonType }>`
  background: #7a41e0;
  color: #ffffff;
  width: 100%;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
  border: 1px solid #7a41e0;
  border-radius: 3px;
  font-family: var(--inter-font);
  cursor: pointer;
  body.dark & {
    border: 1px solid #CCD5DE;
  }
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IButtonType],
      };
    })};

  &:hover {
    filter: brightness(0.8);
  }
  transition: filter 0.2s;
`;
