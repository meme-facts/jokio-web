import SearchIcon from "@mui/icons-material/Search";
import {
  DivHeader,
  HamburgerButton,
  HeaderContainer,
  SearchForm,
  SearchIconWrapper,
  SearchInput,
  StyledHeader,
  Switch,
  TestHeaderWrapper,
} from "./styles";
import { useState, useEffect } from "react";
import useColorMode from "../../hooks/useColorMode";
import { AiOutlineMenu } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (typeof setColorMode === "function") {
      setColorMode(colorMode === "light" ? "dark" : "light");
    }
  };
  function sidebarState() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      // Rolando para baixo
      setIsHidden(true);
    } else {
      // Rolando para cima
      setIsHidden(false);
    }
    setPrevScrollPos(currentScrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <DivHeader>
      <StyledHeader className={isHidden ? "hidden-header" : ""}>
        <HeaderContainer>
          <HamburgerButton
            isOpen={isSidebarOpen}
            onClick={() => {
              toggleSidebar();
              sidebarState();
            }}
          >
            {isSidebarOpen ? (
              <BsArrowLeftShort width="auto" />
            ) : (
              <AiOutlineMenu />
            )}
          </HamburgerButton>
          <SearchForm
            action="https://formbold.com/s/unique_form_id"
            method="POST"
          >
            <SearchInput type="text" placeholder="Pesquisar" />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </SearchForm>
          <TestHeaderWrapper>
            <Switch
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />

            {/* Possível nome do user com o icone */}
          </TestHeaderWrapper>
        </HeaderContainer>
      </StyledHeader>
    </DivHeader>
  );
};

export default Header;
