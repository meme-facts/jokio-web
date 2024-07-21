import { CSSProperties } from "react";
import styled from "@emotion/styled";

type IDiv = CSSProperties & React.HTMLAttributes<HTMLDivElement>;

export const DivTab = styled.div<{ sx?: IDiv }>`
  display: flex;
  width: 100%;
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
export const Tab = styled.div<{ $active: boolean }>`
  width: 150px;
  text-align: center;
  padding-bottom: 5px;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: ${(props) => (props.$active ? "2px solid #7a41e0" : "none")};
`;
