import { CSSProperties, PropsWithChildren } from "react";
import styled from "@emotion/styled";

type IHeading = CSSProperties & React.HTMLAttributes<HTMLHeadElement>;

export const HStyled = styled.p<{ sx?: IHeading }>`
  margin: 0;
  font-family: var(--inter-font);
  ${(props) =>
    props.sx &&
    Object.keys(props.sx).map((name) => {
      return {
        [name]: props.sx && props.sx[name as keyof IHeading],
      };
    })};
`;

export function H5({ children, ...props }: PropsWithChildren<IHeading>) {
  return (
    <HStyled
      sx={{
        fontSize: "23px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "150%",
        margin: "0",
        ...props,
      }}
    >
      {children}
    </HStyled>
  );
}
export function H6({ children, ...props }: PropsWithChildren<IHeading>) {
  return (
    <HStyled
      sx={{
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "150%",
        margin: "0",
        ...props,
      }}
    >
      {children}
    </HStyled>
  );
}
