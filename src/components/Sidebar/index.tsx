import Icon, { IIcon } from "@components/shared/Icon";
import DraweSidebar from "@components/utils/Drawer/Drawer";
import Logo from "@components/utils/Logo/Logo";
import { LogoutOutlined } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import {
  ButtonExpand,
  ButtonHidden,
  LogoLink,
  MenuGroup,
  MenuWrapper,
  SidebarWrapper,
  Icon as StyledIcon,
  StyledLink,
} from "./styles";
import { P1, P2 } from "@components/shared/text/Paragraph";
import { IconType } from "react-icons";

interface IMenu {
  name: string;
  icon: IIcon | IconType;
  path: string;
}

interface SidebarProps {
  onOpenDrawer: () => void;
  expandSidebar: boolean;
}
const Sidebar = () => {
  const router = useRouter();
  const { user, logOut } = useAuthorization();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [menus, setMenus] = useState<IMenu[]>([]);

  const handleCloseDrawer = () => {
    setIsMessagesOpen(false);
  };

  function handleLogout() {
    try {
      logOut();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    setMenus([
      { name: "Home", icon: AiOutlineHome, path: "/app" },
      { name: "Criar um meme", icon: AiOutlinePlusCircle, path: "#" },
      { name: "Explorar", icon: TravelExploreIcon, path: "#" },
      { name: "Notificações", icon: BsBell, path: "#" },
      {
        name: "Mensagens",
        icon: ChatBubbleOutlineIcon,
        path: "/app/messages",
      },
      {
        name: "Perfil",
        icon: FiUser,
        path: `/app/profile/${user?.nickname}`,
      },
      { name: "Configurações", icon: AiOutlineSetting, path: "#" },
    ]);
  }, [user]);
  return (
    <>
      <ButtonExpand
        expand={expandSidebar}
        onClick={() => setExpandSidebar(!expandSidebar)}
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
                  onClick={() => router.push(menu.path)}
                  $active={isActive}
                >
                  <Icon icon={menu.icon} />
                  <P2 textAlign="center">{menu.name}</P2>
                </MenuGroup>
              );
            })}
          </MenuWrapper>
          <Icon
            onClick={() => handleLogout()}
            icon={LogoutOutlined}
            styles={{
              alignSelf: "center",
              marginTop: "auto",
              padding: "10px",
              cursor: "pointer",
            }}
          />

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
