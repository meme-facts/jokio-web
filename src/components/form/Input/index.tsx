import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";
import { Container, FormLabel, InputGroup, StyledInput } from "./styles";
import { P1 } from "@components/text/Paragraph";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  control: Control<any>;
  label?: string;
}

export function Input({
  control,
  register,
  label,
  width = "330px",
  height = "44px",
  ...rest
}: InputProps) {
  return (
    <Container width={width} height={height}>
      <InputGroup>
        {label && (
          <FormLabel>
            <P1>{label}</P1>
          </FormLabel>
        )}
        <Controller
          name={register.name}
          control={control}
          render={({ field }) => (
            <StyledInput
              {...rest}
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
