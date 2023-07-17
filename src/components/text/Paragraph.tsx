import { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";

type IParagraph = CSSProperties & React.HTMLAttributes<HTMLParagraphElement>;

export const PStyled = styled.p<IParagraph>`
  margin: 0;
  ${(props) =>
    Object.keys(props).map((name) => {
      return {
        [name]: props[name as keyof IParagraph],
      };
    })};
`;

export function P1({ children, ...props }: PropsWithChildren<IParagraph>) {
  return (
    <PStyled fontSize="0.875rem" {...props}>
      {children}
    </PStyled>
  );
}

export function P2({ children, ...props }: PropsWithChildren<IParagraph>) {
  return (
    <PStyled fontSize="1rem" {...props}>
      {children}
    </PStyled>
  );
}
