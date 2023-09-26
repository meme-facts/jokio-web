import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "@emotion/styled";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

export const Div = styled.div<{ sx: IDiv }>`
  display: flex;
  width: 100%;
  height: 100%;
  ${(props) =>
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx[name as keyof IDiv],
      };
    })};
`;

function HStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return <Div sx={{ ...props }}>{children}</Div>;
}

function VStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return <Div sx={{ flexDirection: "column", ...props }}>{children}</Div>;
}

export { HStack, VStack };
