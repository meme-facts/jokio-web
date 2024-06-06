import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #ccd5de;
  body.dark & {
    background-color: #27323D; 
  }
  margin: 0;
  padding: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  justify-content: center;
  align-items: center;
  body.dark & {
    background-color: #171D24;
    border:none; 
  }
  background-color: #ffffff;
  border: solid 2px #ffffff;
  border-radius: 4px;
  padding: 30px 60px;
  max-height: 667px;
  flex-shrink: 0;
`;
