import React, { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

export const Div = styled.div<IDiv>`
  display: flex;
  width: 100%;
  height: 100%;
  ${(props) =>
    Object.keys(props).map((name) => {
      return {
        [name]: props[name as keyof IDiv],
      };
    })};
`;

function HStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return <Div {...props}>{children}</Div>;
}

function VStack({ children, ...props }: PropsWithChildren<IDiv>) {
  return (
    <Div flexDirection="column" {...props}>
      {children}
    </Div>
  );
}

export { HStack, VStack };
