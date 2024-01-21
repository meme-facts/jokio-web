
import { Global } from "@emotion/react";
import React, { useEffect, useState } from 'react';

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Puller, Root, StyledBox, Title } from "./styles";

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
  opened: boolean;
  title?: string;
  children: React.ReactNode;
}

const SwipeableEdgeDrawer = ({ opened, children, title }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller color={"white"} />
          <Title>{title}</Title>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pt: 4,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* <Skeleton variant="rectangular" height="100%" /> */}
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};
export default SwipeableEdgeDrawer;
