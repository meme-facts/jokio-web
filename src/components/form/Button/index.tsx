import { PropsWithChildren } from "react";
import { IButton, StyledButton } from "./styles";

export function Button({ children, ...rest }: PropsWithChildren<IButton>) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
