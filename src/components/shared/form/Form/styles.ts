import { CSSProperties, FormHTMLAttributes } from "react";
import styled from "styled-components";

export type IFormType = CSSProperties & FormHTMLAttributes<HTMLFormElement>;

export const StyledForm = styled.form<{ sx: IFormType }>`
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IFormType],
      };
    })};
`;
