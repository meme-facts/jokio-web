import { HStack } from "@components/shared/flex/Stacks";
import { P, P1, P2 } from "@components/shared/text/Paragraph";
import { PropsWithChildren } from "react";
import { IButtonType, StyledButton } from "./styles";
import Icon, { IIcon } from "@components/shared/Icon";

type Size = "sm" | "md" | "lg";
interface IButtonProps extends IButtonType {
  size?: Size;
  rightIcon?: IIcon;
}

export function Button({
  children,
  size,
  rightIcon,
  onClick,
  ...rest
}: PropsWithChildren<IButtonProps>) {
  switch (size) {
    case "sm":
      return (
        <StyledButton onClick={onClick} sx={{ height: "38px", ...rest }}>
          <HStack
            height="0.75rem"
            gap="5px"
            alignItems="center"
            justifyContent="center"
          >
            {rightIcon && <Icon icon={rightIcon} />}
            <P>{children}</P>
          </HStack>
        </StyledButton>
      );

    case "lg":
      return (
        <StyledButton onClick={onClick} sx={{ height: "52px", ...rest }}>
          <HStack gap="5px" alignItems="center" justifyContent="center">
            {rightIcon && <Icon icon={rightIcon} />}
            <P2>{children}</P2>
          </HStack>
        </StyledButton>
      );

    default:
      return (
        <StyledButton onClick={onClick} sx={{ height: "44px", ...rest }}>
          <HStack
            height="0.875rem"
            gap="5px"
            alignItems="center"
            justifyContent="center"
          >
            {rightIcon && <Icon icon={rightIcon} />}
            <P1>{children}</P1>
          </HStack>
        </StyledButton>
      );
  }
}
