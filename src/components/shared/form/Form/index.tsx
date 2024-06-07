import { PropsWithChildren } from "react";
import { IFormType, StyledForm } from "./styles";

export function Form(props: PropsWithChildren<IFormType>) {
  return (
    <StyledForm onSubmit={props.onSubmit} sx={props}>
      {props.children}
    </StyledForm>
  );
}
