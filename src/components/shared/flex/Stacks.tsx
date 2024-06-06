import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "@emotion/styled";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

type IForm = CSSProperties & React.HTMLAttributes<HTMLFormElement>;

export const StyledDiv = styled.div<{ sx: IDiv }>`
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IDiv],
      };
    })};
`;

export const Form = styled.form<{ sx: IForm }>`
  display: flex;
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IForm],
      };
    })};
`;

function Div({ children, ...props }: PropsWithChildren<IDiv>) {
  return (
    <StyledDiv onClick={props.onClick} sx={{ ...props }}>
      {children}
    </StyledDiv>
  );
}

function HStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return (
    <StyledDiv onClick={props.onClick} sx={{ display: "flex", ...props }}>
      {children}
    </StyledDiv>
  );
}

function VStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return (
    <StyledDiv
      onClick={props.onClick}
      sx={{ display: "flex", flexDirection: "column", ...props }}
    >
      {children}
    </StyledDiv>
  );
}

function HStackForm({ children, ...props }: PropsWithChildren<IForm>) {
  return (
    <Form onSubmit={props.onSubmit} sx={{ display: "flex", ...props }}>
      {children}
    </Form>
  );
}

function VStackForm({ children, ...props }: PropsWithChildren<IForm>) {
  return (
    <Form
      onSubmit={props.onSubmit}
      sx={{ display: "flex", flexDirection: "column", ...props }}
    >
      {children}
    </Form>
  );
}

export { HStack, VStack, HStackForm, VStackForm, Div };
