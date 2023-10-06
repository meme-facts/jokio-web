import SearchIcon from '@mui/icons-material/Search';
import { HeaderContainer, SearchForm, SearchIconWrapper, SearchInput, StyledHeader, TestHeaderWrapper } from "./styles";

const Header = () => {

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
          {/* Possível nome do user com o icone */}
        </TestHeaderWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
