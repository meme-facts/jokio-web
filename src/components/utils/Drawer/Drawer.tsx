import React, { useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import UserPhoto from '@components/UserPhoto';
import { ContainerMensagens, DrawerContainer, Mensagem, Mensagens, TextMenuDrawer, UserName } from './styles';
import { Badge } from '@mui/material';

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
            <ContainerMensagens key={i}>
              <UserPhoto />
              <Mensagens>
                <UserName>@gabrikf</UserName>
                <Mensagem>olha esse aqui!</Mensagem>
              </Mensagens>
            </ContainerMensagens>
          ))}
        </DrawerContainer>
      </Drawer>
    </div>
  );
}
export default DrawerSidebar;
