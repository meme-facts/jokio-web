import { PropsWithChildren } from "react";
import { styled } from "styled-components";

export const H5Styled = styled.p`
  font-family: Inter;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 34.5px */
  margin: 0;
`;

export function H5({ children }: PropsWithChildren<unknown>) {
  return <H5Styled>{children}</H5Styled>;
}
