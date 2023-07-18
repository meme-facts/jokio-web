import { PropsWithChildren } from "react";
import { IButton, StyledButton } from "./styles";
import { P, P1, P2 } from "@components/text/Paragraph";

type Size = "sm" | "md" | "lg";
interface ISize {
  size?: Size;
}

export function Button({
  children,
  tabSize,
  size,
  ...rest
}: PropsWithChildren<IButton & ISize>) {
  switch (size) {
    case "sm":
      return (
        <StyledButton height="38px" {...rest}>
          <P>{children}</P>
        </StyledButton>
      );

    case "lg":
      return (
        <StyledButton height="52px" {...rest}>
          <P2>{children}</P2>
        </StyledButton>
      );

    default:
      return (
        <StyledButton height="44px" {...rest}>
          <P1>{children}</P1>
        </StyledButton>
      );
  }
}
