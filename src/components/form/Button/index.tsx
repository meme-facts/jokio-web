import { PropsWithChildren } from "react";
import { IButton, StyledButton } from "./styles";
import { P, P1, P2 } from "@components/text/Paragraph";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Icon, { IIcon } from "@components/Icon";
import { HStack } from "@components/flex/Stacks";

type Size = "sm" | "md" | "lg";
interface IButtonProps extends IButton {
  size?: Size;
  rightIcon?: IIcon;
}

export function Button({
  children,
  tabSize,
  size,
  rightIcon,
  ...rest
}: PropsWithChildren<IButtonProps>) {
  switch (size) {
    case "sm":
      return (
        <StyledButton height="38px" {...rest}>
          <HStack gap="5px" alignItems="center" justifyContent="center">
            {rightIcon && <Icon styles={{}} icon={rightIcon} />}
            <P>{children}</P>
          </HStack>
        </StyledButton>
      );

    case "lg":
      return (
        <StyledButton height="52px" {...rest}>
          <HStack gap="5px" alignItems="center" justifyContent="center">
            {rightIcon && <Icon icon={rightIcon} />}
            <P2>{children}</P2>
          </HStack>
        </StyledButton>
      );

    default:
      return (
        <StyledButton height="44px" {...rest}>
          <HStack
            height="0.875rem"
            gap="5px"
            alignItems="center"
            justifyContent="center"
          >
            {rightIcon && (
              <Icon
                styles={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={rightIcon}
              />
            )}
            <P1>{children}</P1>
          </HStack>
        </StyledButton>
      );
  }
}
