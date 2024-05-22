import styled from "styled-components";
import { Outlet } from "react-router-dom"; // 자식 컴포넌트를 특정영역에 포함시키는 것
import SidebarContainer from "./sideBar/SideBarContainer";
import { StyledLink } from "../style/LayoutStyle";

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  /* background-color: white; */
  color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Layout = () => {
  return (
    <>
      <Container>
        <HeaderStyle>
          FMI
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/">About</StyledLink>
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
