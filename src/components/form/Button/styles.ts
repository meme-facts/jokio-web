import { styled } from "styled-components";
import { IButtonProps, IVariants } from ".";

export const StyledButton = styled.button<any>`
  /* Adapt the colors based on primary prop */
  background: #7a41e0;
  color: #ffffff;
  width: 100%;
  font-size: 1em;
  margin: 0;
  padding: 0;
  border: 1px solid #7a41e0;
  border-radius: 3px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;

  &:hover {
    filter: brightness(0.5);
  }
  transition: filter 0.2s;
`;
