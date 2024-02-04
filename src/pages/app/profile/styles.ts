// import styled from "styled-components";
import { DivTab } from "@components/shared/Tabs";
import { HStack } from "@components/shared/flex/Stacks";
import styled from "@emotion/styled";
// export const ImagesGridContent = styled.textarea``;
export const DivProfile = styled(HStack)`
  align-items: center;
  width: 100%;
  padding-top: 25px;

  @media screen and (max-width: 750px) {
    position: relative;
    flex-direction: column-reverse;
    /* top: 22rem; */
    display: flex;
  }
`;
// export const PostInput = styled.textarea``;
export const DivTabStyle = styled(DivTab)`
  @media screen and (max-width: 750px) {
    display: none;
  }
`;
