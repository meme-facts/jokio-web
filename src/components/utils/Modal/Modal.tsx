import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";

const CustomizedBox = styled(Box)`
  font-family: Inter, sans-serif;
  position: absolute;
  max-height: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 62rem;
  border-radius: 10px;
  box-shadow: 24;
  padding: 4px;
  display: flex;
  background-color: #fff;
  border: none;
  outline: none;
  body.dark & {
    background-color: #1e2730;
  }
`;

interface ModalProps {
  opened: boolean;
  children: React.ReactNode;
  onClosed: (state: boolean) => void;
}
export default function ModalPost({ opened, children, onClosed }: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(!open);

  return (
    <div>
      <Modal
        open={opened}
        onClose={onClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomizedBox>{children}</CustomizedBox>
      </Modal>
    </div>
  );
}
