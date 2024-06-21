import { CSSProperties } from "react";
import styled from "styled-components";
import { colors } from "../../../../style/colors";

export type InputType = CSSProperties &
  React.InputHTMLAttributes<HTMLInputElement>;

export type focus = React.FocusEvent;

export const StyledInput = styled.input.attrs({ type: "file" })`
  /* Hide the actual input element */
  display: none;

  /* Style for the label which will look like a button */
  & + label {
    width: 100%;
    display: inline-block;
    background-color: ${colors.primary[400]};
    color: white;
    padding: 5px 0px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${colors.primary[500]};
    }
  }
`;

export const Container = styled.div<{ sx: InputType }>`
  width: ${(props) => props.sx.width};
  min-width: ${(props) => props.sx.width};
  min-height: ${(props) => props.sx.height};
`;
