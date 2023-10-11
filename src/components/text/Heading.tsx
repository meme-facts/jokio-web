import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

export const H5Styled = styled.p`
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 34.5px */
  margin: 0;
`;
export const H6Styled = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 34.5px */
  margin: 0;
`;
export function H5({ children }: PropsWithChildren<unknown>) {
  return <H5Styled>{children}</H5Styled>;
}
export function H6({ children }: PropsWithChildren<unknown>) {
  return <H6Styled>{children}</H6Styled>;
}
