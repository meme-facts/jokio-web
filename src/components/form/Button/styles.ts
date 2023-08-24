import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from "react";
import { styled } from "styled-components";
import { Styled } from "styled-components/dist/constructors/constructWithOptions";
import { BaseObject } from "styled-components/dist/types";

export type IButton = CSSProperties &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const StyledButton = styled.button<CSSProperties>`
  background: #7a41e0;
  color: #ffffff;
  width: 100%;
  font-size: 12px;
  margin: 0;
  padding: 0;
  border: 1px solid #7a41e0;
  border-radius: 3px;
  font-family: var(--inter-font);
  cursor: pointer;
  ${(props) =>
    Object.keys(props).map((name) => {
      return {
        [name]:
          props[name as keyof React.ButtonHTMLAttributes<HTMLButtonElement>],
      };
    })};

  &:hover {
    filter: brightness(0.8);
  }
  transition: filter 0.2s;
`;
