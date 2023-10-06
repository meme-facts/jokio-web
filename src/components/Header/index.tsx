import SearchIcon from '@mui/icons-material/Search';
import { HeaderContainer, SearchForm, SearchIconWrapper, SearchInput, StyledHeader, Switch, TestHeaderWrapper } from "./styles";
import { useState } from 'react';
import useColorMode from '../../hooks/useColorMode';
const Header = () => {
const [isChecked, setIsChecked] = useState(false);
const [colorMode, setColorMode] = useColorMode();

const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (typeof setColorMode === 'function') {
      setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }
}
  return (
    <StyledHeader >
      <HeaderContainer>
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
