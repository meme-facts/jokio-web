import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import * as React from "react";
import { CustomizedBox } from "./styles";

interface ModalProps {
  opened: boolean;
  children: React.ReactNode;
  onClosed: (state: boolean) => void;
  width?: string;
  height?: string;
}
export default function Modal({
  opened,
  children,
  onClosed,
  height,
  width,
}: ModalProps) {
  return (
    <MuiModal
      open={opened}
      onClose={onClosed}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CustomizedBox height={height} width={width}>
        {children}
      </CustomizedBox>
    </MuiModal>
  );
}
