import DraweSidebar from "@components/utils/Drawer/Drawer";
import Logo from "@components/utils/Logo/Logo";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TuneIcon from "@mui/icons-material/Tune";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import { useAuthorization } from "../../hooks/store/useAuthorization";
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
interface SidebarProps {
  onOpenDrawer?: () => void;
  expandSidebar?: boolean;
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
    { name: "Explorar", icon: <TravelExploreIcon />, path: "#" },
    { name: "Notificações", icon: <NotificationsNoneIcon />, path: "#" },
    { name: "Mensagens", icon: <ChatBubbleOutlineIcon />, path: "#" },
    {
      name: "Perfil",
      icon: <PersonOutlineIcon />,
      path: `/app/profile/${user?.nickname}`,
    },
    { name: "Configurações", icon: <TuneIcon />, path: "#" },
  ];
  return (
    <>
      {/* <ButtonExpand
        expand={expandSidebar}
        onClick={() => {
          console.log("teste slci");
          setExpandSidebar(!expandSidebar);
        }}
      >
        <VscThreeBars />
      </ButtonExpand> */}
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
