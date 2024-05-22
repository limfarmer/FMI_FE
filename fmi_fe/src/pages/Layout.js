import styled from "styled-components";
import { Outlet } from "react-router-dom"; // 자식 컴포넌트를 특정영역에 포함시키는 것
import SidebarContainer from "./sideBar/SideBarContainer";
import { StyledLink } from "../style/LayoutStyle";
import FMI_logo from "../images/FMI_logo.png";
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
  height: 70px;
  /* background-color: white; */
  color: #e9e9ea;
  font-size: 24px;
  position: fixed;
  padding-top: 20px;
  top: 0;
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
  width: 900px;
`;
const Layout = () => {
  return (
    <>
      <Container>
        <HeaderStyle>
          <img src={FMI_logo} alt="FMI_logo" />
          <HeaderMenuStyle>
            <StyledLink to="/">HOME</StyledLink>
            <StyledLink to="/">ABOUT US</StyledLink>
            <StyledLink to="/">CONTACT</StyledLink>
          </HeaderMenuStyle>
          <SidebarContainer></SidebarContainer>
        </HeaderStyle>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
