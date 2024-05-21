import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"; // 자식 컴포넌트를 특정영역에 포함시키는 것
import SideBar from "./sideBar/SideBar";
import SideBarFooter from "./sideBar/SideBarFooter";

const Dummy = styled.div``;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  /* background-color: white; */
  color: black;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 1024px;
  width: 250px;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.4s ease-in-out;
`;
const SidebarItem = styled.div``;

const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  background-color: red;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & div {
    width: 100%;
    height: 3px;
    background-color: #333;
    border-radius: 5px;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #3498db;
  }
`;
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Container>
        <HeaderStyle>
          <StyledLink to="/">FMI</StyledLink>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/">About</StyledLink>
          <HamburgerButton onClick={onClick} />
          <SidebarContainer isOpen={isOpen}>
            <SideBar />
            <SideBarFooter />
          </SidebarContainer>
        </HeaderStyle>
        <main>
          <Dummy />
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
