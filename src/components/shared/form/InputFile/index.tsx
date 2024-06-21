import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";
import { Container, StyledInput } from "./styles";
import { P1 } from "@components/shared/text/Paragraph";
import { CSSProperties } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  control: Control<any>;
  label?: string;
}
type IInput = CSSProperties & InputProps;

export function InputFile({
  control,
  register,
  label,
  width = "100%",
  height = "44px",
  type,
  ...rest
}: IInput) {
  return (
    <Container sx={{ width, height }}>
      <Controller
        name={register.name}
        control={control}
        render={({ field }) => (
          <>
            <StyledInput
              onBlur={field.onBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.files && e.target.files[0])
              }
              value={(field.value && field.value.filename) ?? ""}
              placeholder={rest.placeholder}
              id="input-file"
            />
            <label htmlFor="input-file">{label}</label>
          </>
        )}
      />
    </Container>
  );
}
