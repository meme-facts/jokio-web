import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import { IconMenu, NavbarDiv, StyledLink } from "./styles";
import { useRouter } from "next/router";
const Navbar = () => {
  const { user } = useAuthorization();
  const router = useRouter();

  const menus = [
    {
      name: "Home",
      icon: <CottageOutlinedIcon fontSize="large" />,
      path: "/app",
    },
    {
      name: "Explorar",
      icon: <TravelExploreIcon fontSize="large" />,
      path: "#",
    },
    {
      name: "Criar um meme",
      icon: <AddCircleOutlineIcon fontSize="large" />,
      path: "#",
    },
    {
      name: "Notificações",
      icon: <NotificationsNoneIcon fontSize="large" />,
      path: "#",
    },
    {
      name: "Perfil",
      icon: <PersonOutlineIcon fontSize="large" />,
      path: `/app/profile/${user?.nickname}`,
    },
  ];
  return (
    <NavbarDiv>
      {menus.map((menu, index) => {
        const isActive = router.asPath === menu.path;

        return (
          <StyledLink href={menu.path}>
            <IconMenu active={isActive}>{menu.icon}</IconMenu>
          </StyledLink>
        );
      })}
    </NavbarDiv>
  );
};

export default Navbar;
