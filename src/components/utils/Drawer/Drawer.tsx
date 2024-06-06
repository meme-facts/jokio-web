import UserPhoto from '@components/UserPhoto';
import { Badge } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { ContainerMessages, DrawerContainer, Mensagem, Message, Messages, TextMenuDrawer, UserName } from './styles';

interface DrawerProps {
  opened: boolean;
  menu: string;
  onClosed: (state: boolean) => void;
}

const DrawerSidebar = ({ opened, menu, onClosed }: DrawerProps) => {
  const [state, setState] = React.useState({ left: false });
  useEffect(() => {
    setState({ ...state, ['left']: opened });

  }, [opened]);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {

    setState({ ...state, ['left']: open });
  };

  return (
    <div>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer(false)}
      >
        <DrawerContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextMenuDrawer>{menu}</TextMenuDrawer>
            <Badge> 10 Não lidas</Badge>
          </div>
          {Array.from({ length: 10 }).map((_, i) => (
            <ContainerMessages key={i}>
              <UserPhoto />
              <Messages>
                <UserName>@gabrikf</UserName>
                <Message>olha esse aqui!</Message>
              </Messages>
            </ContainerMessages>
          ))}
        </DrawerContainer>
      </Drawer>
    </div>
  );
}
export default DrawerSidebar;
