import React, { useState, useMemo } from "react";
import { AiOutlinePlusCircle, AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { FiUser } from 'react-icons/fi';
import { BsBell } from "react-icons/bs";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Icon, LogoLink, MenuGroup, SidebarWrapper, StyledLink } from "./styles";
import { useRouter } from "next/router";
import DraweSidebar from "@components/utils/Drawer/Drawer";
import Logo from "@components/utils/Logo/Logo";
interface SidebarProps {
    onOpenDrawer: () => void;
    expandSidebar: boolean;
}
const Sidebar = ({ onOpenDrawer, expandSidebar }: SidebarProps) => {
    const router = useRouter()
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("");

    const handleMenuItemClick = (menu: any) => {
        if (menu.nome === 'Mensagens' || menu.nome === 'Notificações') {
            setIsMessagesOpen(!isMessagesOpen);
            setCurrentMenu(menu.nome);
        }
    };
    const handleCloseDrawer = () => {
        setIsMessagesOpen(false);
    };
    const menus = useMemo(() => [
        { nome: 'Home', icone: <AiOutlineHome />, path: "/app" },
        { nome: 'Criar um meme', icone: <AiOutlinePlusCircle />, path: "#" },
        { nome: 'Explorar', icone: <PiMagnifyingGlassLight />, path: "#" },
        { nome: 'Notificações', icone: <BsBell />, path: "#" },
        { nome: 'Mensagens', icone: <ChatBubbleOutlineIcon />, path: "#" },
        { nome: 'Perfil', icone: <FiUser />, path: "#" },
        { nome: 'Configurações', icone: <AiOutlineSetting />, path: "#" }
    ], []);
    return (
        <>
            <SidebarWrapper isOpen={expandSidebar}>
                <LogoLink href="">
                    <Logo />
                </LogoLink>
                {menus.map((menu, index) => {
                    const isActive = router.pathname === menu.path;
                    return (
                        <MenuGroup onClick={() => handleMenuItemClick(menu)} isActive={isActive} key={menu.nome}>
                            <Icon>
                                {menu.icone}
                            </Icon>
                            <StyledLink href={menu.path} >
                                {menu.nome}
                            </StyledLink>
                        </MenuGroup>
                    )
                })}
                {isMessagesOpen && <DraweSidebar onClosed={handleCloseDrawer} menu={currentMenu} opened={isMessagesOpen} />}
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;