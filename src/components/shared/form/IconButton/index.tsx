import Icon, { IIcon } from "@components/shared/Icon";
import styled from "styled-components";
import { IButtonType } from "../Button/styles";

interface IIconButtonProps extends IButtonType {
  icon: IIcon;
  iconStyles?: React.CSSProperties | undefined;
  hide?: boolean;
  onClick?: () => void;
  isDisabled: boolean;
}

const Button = styled.button<{ sx: IButtonType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s;
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IButtonType],
      };
    })};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

export function IconButton({
  icon,
  isDisabled,
  hide,
  onClick,
  iconStyles,
  ...props
}: IIconButtonProps) {
  if (hide) {
    return undefined;
  }

  return (
    <Button
      type="submit"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      sx={props}
    >
      <Icon icon={icon} styles={iconStyles} />
    </Button>
  );
}
