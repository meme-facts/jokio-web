import React, { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

export const Div = styled.div<IDiv>`
  display: flex;
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

export default HStack;
