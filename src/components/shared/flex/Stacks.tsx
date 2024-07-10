import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "@emotion/styled";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

interface IDivComposed extends IDiv {
  _hover?: IDiv;
  sm?: IDiv;
  md?: IDiv;
}

interface IStyledDivProps {
  sx: IDiv;
  _hover?: IDiv;
  sm?: IDiv;
  md?: IDiv;
}

type IForm = CSSProperties & React.HTMLAttributes<HTMLFormElement>;

export const StyledDiv = styled.div<IStyledDivProps>`
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IDiv],
      };
    })};

  &:hover {
    ${(props) =>
      props._hover &&
      Object.keys(props._hover).map((name) => {
        return {
          [name]: props._hover?.[name as keyof IDiv],
        };
      })};
  }

  @media (max-width: 900px) {
    ${(props) =>
      props.md &&
      Object.keys(props.md).map((name) => {
        return {
          [name]: props.md?.[name as keyof IDiv],
        };
      })};
  }
  @media (max-width: 640px) {
    ${(props) =>
      props.sm &&
      Object.keys(props.sm).map((name) => {
        return {
          [name]: props.sm?.[name as keyof IDiv],
        };
      })};
  }
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

function Div({
  children,
  sm,
  md,
  _hover,
  ...props
}: PropsWithChildren<IDivComposed>) {
  return (
    <StyledDiv
      sm={sm}
      md={md}
      _hover={_hover}
      onClick={props.onClick}
      sx={{ ...props }}
    >
      {children}
    </StyledDiv>
  );
}

function HStack({
  children,
  sm,
  md,
  ...props
}: PropsWithChildren<IDivComposed>) {
  return (
    <StyledDiv
      onClick={props.onClick}
      sx={{ display: "flex", ...props }}
      sm={sm}
      md={md}
      _hover={props._hover}
    >
      {children}
    </StyledDiv>
  );
}

function VStack({
  children,
  sm,
  md,
  _hover,
  ...props
}: PropsWithChildren<IDivComposed>) {
  return (
    <StyledDiv
      onClick={props.onClick}
      sx={{ display: "flex", flexDirection: "column", ...props }}
      sm={sm}
      md={md}
      _hover={_hover}
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
