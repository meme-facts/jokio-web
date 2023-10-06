import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { FiUser } from 'react-icons/fi';
import { BsBell } from "react-icons/bs";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Icon, LogoLink, MenuGroup, SidebarWrapper, StyledLink, Path, Switch } from "./styles";
import { useRouter } from "next/router";
import useColorMode from "../../hooks/useColorMode";

const Sidebar = () => {
    const router = useRouter()
    const [menus, setMenus] = useState([
        { nome: 'Home', icone: <AiOutlineHome />, path: "/app" },
        { nome: 'Criar um meme', icone: <AiOutlinePlusCircle />, path: "#" },
        { nome: 'Explorar', icone: <PiMagnifyingGlassLight />, path: "#" },
        { nome: 'Notificações', icone: <BsBell />, path: "#" },
        { nome: 'Mensagens', icone: <ChatBubbleOutlineIcon />, path: "#" },
        { nome: 'Perfil', icone: <FiUser />, path: "#" },
        { nome: 'Configurações', icone: <AiOutlineSetting />, path: "#" }]);
    return (
        <SidebarWrapper>
            <LogoLink href="">
                <svg width="132" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M25.5542 12.4468C25.5542 13.521 25.4146 14.5522 25.1353 15.5405C24.8667 16.5181 24.48 17.4365 23.9751 18.2959C23.481 19.1445 22.8848 19.9233 22.1865 20.6323C21.4883 21.3306 20.7095 21.9321 19.8501 22.437C19.0015 22.9312 18.083 23.3179 17.0947 23.5972C16.1064 23.8657 15.0806 24 14.0171 24H0.320801V20.6968H14.0171C15.1558 20.6968 16.2246 20.4819 17.2236 20.0522C18.2227 19.6226 19.0928 19.0371 19.834 18.2959C20.5859 17.5439 21.1768 16.6685 21.6064 15.6694C22.0469 14.6597 22.2671 13.5854 22.2671 12.4468V4.19678H0.320801V0.893555H25.5542V12.4468ZM58.5464 12.4468C58.5464 14.0474 58.2939 15.5513 57.7891 16.9585C57.2842 18.3657 56.5645 19.5903 55.6299 20.6323C54.7061 21.6743 53.5942 22.4961 52.2944 23.0977C50.9946 23.6992 49.5498 24 47.96 24H40.2739C38.6733 24 37.2178 23.6992 35.9072 23.0977C34.5967 22.4961 33.4741 21.6743 32.5396 20.6323C31.6157 19.5903 30.9014 18.3657 30.3965 16.9585C29.8916 15.5513 29.6392 14.0474 29.6392 12.4468C29.6392 10.8569 29.8916 9.36377 30.3965 7.96729C30.9014 6.56006 31.6157 5.33545 32.5396 4.29346C33.4741 3.24072 34.5967 2.41357 35.9072 1.81201C37.2178 1.19971 38.6733 0.893555 40.2739 0.893555H47.96C49.5498 0.893555 50.9946 1.19971 52.2944 1.81201C53.5942 2.41357 54.7061 3.24072 55.6299 4.29346C56.5645 5.33545 57.2842 6.56006 57.7891 7.96729C58.2939 9.36377 58.5464 10.8569 58.5464 12.4468ZM55.2432 12.4468C55.2432 11.3081 55.0767 10.2393 54.7437 9.24023C54.4106 8.24121 53.9272 7.37109 53.2935 6.62988C52.6704 5.87793 51.9077 5.28711 51.0054 4.85742C50.1138 4.41699 49.0986 4.19678 47.96 4.19678H40.2739C39.1353 4.19678 38.1094 4.41699 37.1963 4.85742C36.2939 5.28711 35.5259 5.87793 34.8921 6.62988C34.269 7.37109 33.7856 8.24121 33.4419 9.24023C33.1089 10.2393 32.9424 11.3081 32.9424 12.4468C32.9424 13.5854 33.1089 14.6597 33.4419 15.6694C33.7856 16.6685 34.269 17.5439 34.8921 18.2959C35.5259 19.0371 36.2939 19.6226 37.1963 20.0522C38.1094 20.4819 39.1353 20.6968 40.2739 20.6968H47.96C49.0986 20.6968 50.1138 20.4819 51.0054 20.0522C51.9077 19.6226 52.6704 19.0371 53.2935 18.2959C53.9272 17.5439 54.4106 16.6685 54.7437 15.6694C55.0767 14.6597 55.2432 13.5854 55.2432 12.4468ZM89.8789 24H85.4316L73.6367 12.1245L66.3213 17.3936V24H63.0181V0.893555H66.3213V13.7681L84.4326 0.893555H89.2505L76.1504 10.3037L89.8789 24ZM96.0586 24H92.7554V0.893555H96.0586V24ZM129.454 12.4468C129.454 14.0474 129.201 15.5513 128.696 16.9585C128.191 18.3657 127.472 19.5903 126.537 20.6323C125.613 21.6743 124.501 22.4961 123.202 23.0977C121.902 23.6992 120.457 24 118.867 24H111.181C109.581 24 108.125 23.6992 106.814 23.0977C105.504 22.4961 104.381 21.6743 103.447 20.6323C102.523 19.5903 101.809 18.3657 101.304 16.9585C100.799 15.5513 100.546 14.0474 100.546 12.4468C100.546 10.8569 100.799 9.36377 101.304 7.96729C101.809 6.56006 102.523 5.33545 103.447 4.29346C104.381 3.24072 105.504 2.41357 106.814 1.81201C108.125 1.19971 109.581 0.893555 111.181 0.893555H118.867C120.457 0.893555 121.902 1.19971 123.202 1.81201C124.501 2.41357 125.613 3.24072 126.537 4.29346C127.472 5.33545 128.191 6.56006 128.696 7.96729C129.201 9.36377 129.454 10.8569 129.454 12.4468ZM126.15 12.4468C126.15 11.3081 125.984 10.2393 125.651 9.24023C125.318 8.24121 124.834 7.37109 124.201 6.62988C123.578 5.87793 122.815 5.28711 121.913 4.85742C121.021 4.41699 120.006 4.19678 118.867 4.19678H111.181C110.042 4.19678 109.017 4.41699 108.104 4.85742C107.201 5.28711 106.433 5.87793 105.799 6.62988C105.176 7.37109 104.693 8.24121 104.349 9.24023C104.016 10.2393 103.85 11.3081 103.85 12.4468C103.85 13.5854 104.016 14.6597 104.349 15.6694C104.693 16.6685 105.176 17.5439 105.799 18.2959C106.433 19.0371 107.201 19.6226 108.104 20.0522C109.017 20.4819 110.042 20.6968 111.181 20.6968H118.867C120.006 20.6968 121.021 20.4819 121.913 20.0522C122.815 19.6226 123.578 19.0371 124.201 18.2959C124.834 17.5439 125.318 16.6685 125.651 15.6694C125.984 14.6597 126.15 13.5854 126.15 12.4468Z" />
                </svg>
            </LogoLink>
            {menus.map((menu) => {
                const isActive = router.pathname === menu.path;
                return (
                    <MenuGroup isActive={isActive}>
                        <Icon>
                            {menu.icone}
                        </Icon>
                        <StyledLink href={menu.path}>{menu.nome}</StyledLink>
                    </MenuGroup>
                )
            })}
        </SidebarWrapper>
    );
};

export default Sidebar;
