import { CSSProperties, PropsWithChildren } from "react";
import styled from "@emotion/styled";

type IParagraph = CSSProperties & React.HTMLAttributes<HTMLParagraphElement>;

export const PStyled = styled.p<{ sx?: IParagraph }>`
  margin: 0;
  font-family: var(--inter-font) !important;
  ${(props) =>
    props.sx &&
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx && props.sx[name as keyof IParagraph],
      };
    })};
`;

export function XP({
  children,
  ...props
}: PropsWithChildren<{ sx?: IParagraph }>) {
  return <PStyled sx={{ fontSize: "0.66rem", ...props }}>{children}</PStyled>;
}

export function P({
  children,
  ...props
}: PropsWithChildren<{ sx?: IParagraph }>) {
  return <PStyled sx={{ fontSize: "0.75rem", ...props }}>{children}</PStyled>;
}

export function P1({ children, ...props }: PropsWithChildren<IParagraph>) {
  return <PStyled sx={{ fontSize: "0.875rem", ...props }}>{children}</PStyled>;
}

export function P2({ children, ...props }: PropsWithChildren<IParagraph>) {
  return <PStyled sx={{ fontSize: "1rem", ...props }}>{children}</PStyled>;
}
