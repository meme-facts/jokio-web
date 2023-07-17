import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";
import { Container, FormLabel, InputGroup, StyledInput } from "./styles";
import { P1 } from "@components/text/Paragraph";
import { CSSProperties } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  control: Control<any>;
  label?: string;
}
type IInput = CSSProperties & InputProps;

export function Input({
  control,
  register,
  label,
  width = "100%",
  height = "44px",
  ...rest
}: IInput) {
  return (
    <Container width={width} height={height}>
      <InputGroup>
        {label && <P1 marginBottom="5px">{label}</P1>}
        <Controller
          name={register.name}
          control={control}
          render={({ field }) => (
            <StyledInput
              {...rest}
              width={width}
              height={height}
              onBlur={field.onBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              value={field.value}
            />
          )}
        />
      </InputGroup>
    </Container>
  );
}
