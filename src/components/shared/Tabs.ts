import { CSSProperties } from "react";
import styled from "styled-components";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

export const DivTab = styled.div<{ sx?: IDiv }>`
  display: flex;
  cursor: pointer;
  ${(props) =>
    Object.keys(props?.sx ?? []).map((name) => {
      if (props.sx) {
        return {
          [name]: props.sx[name as keyof IDiv],
        };
      }
    })};
`;
export const Tab = styled.div<{ active: boolean }>`
  width: 20%;
  text-align: center;
  padding-bottom: 5px;
  font-weight: 500;
  border-bottom: ${(props) => (props.active ? "2px solid #7a41e0" : "none")};
`;
