import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

export type IIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
interface IIconProps {
  icon: IIcon;
  styles?: React.CSSProperties | undefined;
  hide?: boolean;
}
function Icon({ icon, styles, hide }: IIconProps) {
  if (hide) {
    return undefined;
  }
  return (
    <SvgIcon
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...styles,
      }}
      component={icon}
      inheritViewBox
    />
  );
}

export default Icon;
