import { PropsWithChildren } from "react";
import { styled } from "styled-components";

export const TextSm = styled.p`
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;
`;

export function P1({ children }: PropsWithChildren<unknown>) {
  return <TextSm>{children}</TextSm>;
}
