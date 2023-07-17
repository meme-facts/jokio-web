import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;

  justify-content: center;
`;

const Line = styled.p`
  border-top: solid 1px #000;
  display: flex;
  flex: 0.45;
`;

function InlineText({ children }: PropsWithChildren<unknown>) {
  return (
    <Container>
      <Line />
      {children}
      <Line />
    </Container>
  );
}

export default InlineText;
