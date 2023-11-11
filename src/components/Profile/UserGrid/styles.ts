import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
`;

export const GridItem = styled.div`
  width: 240px;
  height: 300px;
  border-radius: 2px;
  border: 1px solid #7a41e0;
  background-color: #171d24;
  display: flex;
  align-items: center;
`;

export const Photo = styled.img`
  width: 100%;
`;
