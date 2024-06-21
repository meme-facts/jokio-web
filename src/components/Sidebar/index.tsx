import Icon from "@components/shared/Icon";
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

interface IMenu {
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  onOpenDrawer: () => void;
  expandSidebar: boolean;
}
const Sidebar = ({ onOpenDrawer }: SidebarProps) => {
  const router = useRouter();
  const { user, logOut } = useAuthorization();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [menus, setMenus] = useState<IMenu[]>([]);
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
      { name: "Home", icon: <AiOutlineHome />, path: "/app" },
      { name: "Criar um meme", icon: <AiOutlinePlusCircle />, path: "#" },
      { name: "Explorar", icon: <TravelExploreIcon />, path: "#" },
      { name: "Notificações", icon: <BsBell />, path: "#" },
      {
        name: "Mensagens",
        icon: <ChatBubbleOutlineIcon />,
        path: "/app/messages",
      },
      {
        name: "Perfil",
        icon: <FiUser />,
        path: `/app/profile/${user?.nickname}`,
      },
      { name: "Configurações", icon: <AiOutlineSetting />, path: "#" },
    ]);
  }, [user]);
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
                  $active={isActive}
                >
                  <StyledIcon>{menu.icon}</StyledIcon>
                  <StyledLink href={menu.path}>{menu.name}</StyledLink>
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
