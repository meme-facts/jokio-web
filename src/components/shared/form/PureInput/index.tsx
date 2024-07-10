import { PureInputType, StyledPureInput } from "./styles";

export function PureInput(props: PureInputType) {
  return (
    <StyledPureInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      sx={props}
    />
  );
}
