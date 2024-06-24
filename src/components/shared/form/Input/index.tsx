import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";
import { Container, FormLabel, InputGroup, StyledInput } from "./styles";
import { P, P1 } from "@components/shared/text/Paragraph";
import { CSSProperties } from "react";
import { Div } from "@components/shared/flex/Stacks";
import Icon from "@components/shared/Icon";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Tooltip } from "@mui/material";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  control: Control<any>;
  label?: string;
  error?: string;
}
type IInput = CSSProperties & InputProps;

export function Input({
  control,
  register,
  label,
  width = "100%",
  height = "44px",
  type,
  error,
  ...rest
}: IInput) {
  return (
    <Container sx={{ width, height }}>
      <InputGroup>
        {label && <P1 marginBottom="5px">{label}</P1>}
        <Controller
          name={register.name}
          control={control}
          render={({ field }) => (
            <StyledInput
              onBlur={field.onBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              value={field.value ?? ""}
              placeholder={rest.placeholder}
              type={type ?? undefined}
              sx={{ width, height, ...rest }}
              error={!!error}
            />
          )}
        />
        <P padding="2px 5px" fontStyle="italic" color="red">
          {error}
        </P>
        {error && (
          <Div position="absolute" right="-15px" top="15px">
            <Tooltip title={error} placement="top" arrow>
              <div>
                <Icon
                  styles={{ fontSize: "15px", color: "red" }}
                  icon={ReportGmailerrorredIcon}
                />
              </div>
            </Tooltip>
          </Div>
        )}
      </InputGroup>
    </Container>
  );
}
