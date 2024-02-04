import styled from "styled-components";

export const Grid = styled.div`
  min-width: 720px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  padding: 20px;
  @media screen and (max-width: 750px) {
    min-width: 0px;
  }
`;

export const GridItem = styled.div`
  width: 240px;
  height: 300px;
  border-radius: 2px;
  border: 1px solid #7a41e0;
  background-color: #171d24;
  display: flex;
  align-items: center;
  @media screen and (max-width: 750px) {
    width: 120px;
    height: 185px;
  }
`;
export const SkeletonGridItem = styled.div`
  width: 240px;
  height: 300px;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

export const Photo = styled.img`
  width: 100%;
`;

export const Reloader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
`;
