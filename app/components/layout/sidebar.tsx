// components/Sidebar/sidebar.tsx
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

// Types
type SidebarItemType = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  isOpened?: boolean;
};

// Data
const SidebarData: SidebarItemType[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaIcons.FaHome />,
  },
  {
    title: "Team",
    path: "/team",
    icon: <FaIcons.FaUsers />,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <FaIcons.FaTasks />,
  },
  {
    title: "Chats",
    path: "/chats",
    icon: <FaIcons.FaRocketchat />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FaIcons.FaRegChartBar />,
  },
];

// Styled Components
const SidebarContainer = styled.aside<{ isOpened: boolean }>`
  background: #1a1a2e;
  width: ${({ isOpened }) => (isOpened ? "250px" : "80px")};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  overflow-x: hidden;
  z-index: 10;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: white;
  border-bottom: 1px solid #2d2d42;
`;

const Logo = styled.div<{ isOpened: boolean }>`
  font-size: 20px;
  font-weight: bold;
  display: ${({ isOpened }) => (isOpened ? "block" : "none")};
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  padding: 0;
`;

const SidebarLink = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: ${({ active }) => (active ? "#ffffff" : "#b8b8b8")};
  text-decoration: none;
  background: ${({ active }) => (active ? "#16213e" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    background: #16213e;
    color: white;
  }
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const ItemTitle = styled.span<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? "block" : "none")};
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpened = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(isOpened);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContainer isOpened={sidebarOpen}>
      <SidebarHeader>
        <Logo isOpened={sidebarOpen}>AppName</Logo>
        <ToggleButton onClick={toggleSidebar}>
          {sidebarOpen ? <FaIcons.FaChevronLeft /> : <FaIcons.FaBars />}
        </ToggleButton>
      </SidebarHeader>

      <SidebarMenu>
        {SidebarData.map((item, index) => (
          <SidebarItem key={index}>
            <SidebarLink href={item.path} active={pathname === item.path}>
              <IconWrapper>{item.icon}</IconWrapper>
              <ItemTitle isOpened={sidebarOpen}>{item.title}</ItemTitle>
            </SidebarLink>
          </SidebarItem>
        ))}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
