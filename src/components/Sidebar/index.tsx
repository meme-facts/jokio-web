import React, { useState, useMemo } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  ButtonExpand,
  ButtonHidden,
  Icon,
  LogoLink,
  MenuGroup,
  MenuWrapper,
  SidebarWrapper,
  StyledLink,
} from "./styles";
import { useRouter } from "next/router";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import DraweSidebar from "@components/utils/Drawer/Drawer";
import Logo from "@components/utils/Logo/Logo";
import { VscThreeBars } from "react-icons/vsc";
interface SidebarProps {
  onOpenDrawer: () => void;
  expandSidebar: boolean;
}
const Sidebar = ({ onOpenDrawer }: SidebarProps) => {
  const router = useRouter();
  const { user } = useAuthorization();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [expandSidebar, setExpandSidebar] = useState(false);

  const handleMenuItemClick = (menu: any) => {
    console.log(menu);
    if (menu.name === "Mensagens" || menu.name === "Notificações") {
      setIsMessagesOpen(!isMessagesOpen);
      setCurrentMenu(menu.name);
    }
  };
  const handleCloseDrawer = () => {
    setIsMessagesOpen(false);
  };
  const menus = [
    { name: "Home", icon: <AiOutlineHome />, path: "/app" },
    { name: "Criar um meme", icon: <AiOutlinePlusCircle />, path: "#" },
    { name: "Explorar", icon: <PiMagnifyingGlassLight />, path: "#" },
    { name: "Notificações", icon: <BsBell />, path: "#" },
    { name: "Mensagens", icon: <ChatBubbleOutlineIcon />, path: "#" },
    {
      name: "Perfil",
      icon: <FiUser />,
      path: `/app/profile/${user?.nickname}`,
    },
    { name: "Configurações", icon: <AiOutlineSetting />, path: "#" },
  ];
  return (
    <>
      <ButtonExpand
        expand={expandSidebar}
        onClick={() => {
          console.log("teste slci");
          setExpandSidebar(!expandSidebar);
        }}
      >
        <VscThreeBars />
      </ButtonExpand>
      <div>
        <SidebarWrapper expand={expandSidebar}>
          <ButtonHidden onClick={() => setExpandSidebar(!expandSidebar)}>
            <IoMdArrowBack />
          </ButtonHidden>
          <div>
            <LogoLink href="">
              <Logo />
            </LogoLink>
          </div>
          <MenuWrapper>
            {menus.map((menu) => {
              const isActive = router.asPath === menu.path;
              return (
                <MenuGroup
                  key={menu.name}
                  onClick={() => handleMenuItemClick(menu)}
                  active={isActive}
                >
                  <Icon>{menu.icon}</Icon>
                  <StyledLink href={menu.path}>{menu.name}</StyledLink>
                </MenuGroup>
              );
            })}
          </MenuWrapper>

          <DraweSidebar
            onClosed={handleCloseDrawer}
            menu={currentMenu}
            opened={isMessagesOpen}
          />
        </SidebarWrapper>
      </div>
    </>
  );
};

export default Sidebar;
