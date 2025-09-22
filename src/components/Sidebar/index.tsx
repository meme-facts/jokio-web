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
  Wrapper,
} from "./styles";
import { P1, P2 } from "@components/shared/text/Paragraph";
import { IconType } from "react-icons";
import {
  Bell,
  Home,
  MessageCircle,
  Settings,
  SquarePlus,
  Telescope,
  User,
} from "lucide-react";

interface IMenu {
  name: string;
  icon: React.ComponentType;
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
      { name: "Home", icon: Home, path: "/app" },
      { name: "Criar um meme", icon: SquarePlus, path: "#" },
      { name: "Explorar", icon: Telescope, path: "#" },
      { name: "Notificações", icon: Bell, path: "#" },
      {
        name: "Mensagens",
        icon: MessageCircle,
        path: "/app/messages",
      },
      {
        name: "Perfil",
        icon: User,
        path: `/app/profile/${user?.nickname}`,
      },
      { name: "Configurações", icon: Settings, path: "#" },
    ]);
  }, [user]);
  return (
    <Wrapper>
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
                  <menu.icon size={22} />

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
    </Wrapper>
  );
};

export default Sidebar;
