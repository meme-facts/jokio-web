import { PropsWithChildren } from "react";
import { StyledButton } from "./styles";

export type IVariants = "primary" | "secondary";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IVariants;
}

export function Button({
  children,
  variant = "primary",
  ...rest
}: PropsWithChildren<IButtonProps>) {
  return (
    <StyledButton
      padding="0px"
      margin="0px"
      width="320px"
      height="44px"
      variant={variant}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
