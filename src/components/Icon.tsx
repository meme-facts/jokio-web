import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

export type IIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
interface IIconProps {
  icon: IIcon;
  styles?: React.CSSProperties | undefined;
}
function Icon({ icon, styles }: IIconProps) {
  return <SvgIcon style={styles} component={icon} inheritViewBox />;
}

export default Icon;
