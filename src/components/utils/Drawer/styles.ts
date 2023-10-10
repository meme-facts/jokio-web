import styled from "@emotion/styled";

export const DrawerContainer = styled.div`
  background-color: #171d24;
  color: #ccd5de;
  height: 100%;
  overflow-y: auto;
  width: 270px;
  padding: 30px 30px 30px 16px;
  font-family: Inter, sans-serif;
  transition: all 0.3s ease-in-out;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #11151a;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const TextMenuDrawer = styled.span`
  font-size: 19px;
  font-weight: 600;
  margin: 1rem;
`;

export const ContainerMensagens = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 13px;

  &:hover {
    cursor: pointer;
    background-color: #11151a;
  }
`;

export const Mensagens = styled.div`
  display: grid;
`;

export const UserName = styled.p`
  font-size: 16px !important;
  font-weight: 600;
  margin: 4px 4px 4px 0px;
  padding: 0px;
`;

export const Mensagem = styled.p`
  font-size: 12px !important;
  margin: 0px;
`;

export const Badge = styled.span`
  border-radius: 10px;
  background-color: #652dcc;
  font-weight: 700;
  color: white;
  padding: 3px 4px;
  font-size: smaller;
`;
