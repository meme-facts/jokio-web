import SearchIcon from '@mui/icons-material/Search';
import { HamburgerButton, HeaderContainer, SearchForm, SearchIconWrapper, SearchInput, StyledHeader, Switch, TestHeaderWrapper } from "./styles";
import { useState } from 'react';
import useColorMode from '../../hooks/useColorMode';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (typeof setColorMode === 'function') {
      setColorMode(colorMode === 'light' ? 'dark' : 'light');
    }
  }
  function sidebarState() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <StyledHeader >
      <HeaderContainer>
        <HamburgerButton isOpen={isSidebarOpen} onClick={() => { toggleSidebar(); sidebarState() }}>
          {isSidebarOpen ? <BsArrowLeftShort width='auto' /> : <AiOutlineMenu />}
        </HamburgerButton>
        <SearchForm
          action="https://formbold.com/s/unique_form_id"
          method="POST"
        >
          <SearchInput
            type="text"
            placeholder="Pesquisar"
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchForm>
        <TestHeaderWrapper>
          <Switch type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />

          {/* Possível nome do user com o icone */}
        </TestHeaderWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
