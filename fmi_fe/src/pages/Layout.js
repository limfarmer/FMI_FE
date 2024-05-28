import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SideBarOpenBtt from "./sideBarComponent/SideBarOpenBtt";
import FMI_logo from "../images/FMI_logo.png";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu"; // 새로 만든 HeaderMenu 컴포넌트를 임포트

const Container = styled.div`
  display: flex;
  align-items: center;
  main {
    overflow: hidden;
    user-select: none;
  }
`;
const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  z-index: 99;
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  img {
    width: 220px;
    height: 50px;
    object-fit: cover;
  }
`;
const HeaderMenuStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  color: #e9e9ea;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Layout = () => {
  const [isKey, setIsKey] = useState(false);
  const forceRerender = () => {
    setIsKey(!isKey);
  };
  const onClick = () => {
    forceRerender();
  };
  const userId = localStorage.getItem("user");
  return (
    <>
      <Container>
        <HeaderStyle>
          <img src={FMI_logo} alt="FMI_logo" />
          <HeaderMenuStyle>
            <HeaderMenu onClick={onClick} userId={userId} />
          </HeaderMenuStyle>
          <SideBarOpenBtt />
        </HeaderStyle>
        <main key={isKey}>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
