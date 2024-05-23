import styled from "styled-components";
import { Outlet } from "react-router-dom"; // 자식 컴포넌트를 특정영역에 포함시키는 것
import SidebarContainer from "./sideBarComponent/SideBarContainer";
import { StyledLink } from "../style/LayoutStyle";
import FMI_logo from "../images/FMI_logo.png";
import { useState } from "react";
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
  color: #e9e9ea;
  font-size: 24px;
  z-index: 99;
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
  /**
   * HOME 버튼 눌렀을때 재
   */
  const [isKey, setIsKey] = useState(false);
  const forceRerender = () => {
    setIsKey(!isKey);
  };
  const onClick = () => {
    forceRerender();
  };

  return (
    <>
      <Container>
        <HeaderStyle>
          <img src={FMI_logo} alt="FMI_logo" />
          <HeaderMenuStyle>
            <StyledLink to="/" onClick={onClick}>
              HOME
            </StyledLink>
            <StyledLink to="/">ABOUT US</StyledLink>
            <StyledLink to="/">CONTACT</StyledLink>
          </HeaderMenuStyle>
          <SidebarContainer></SidebarContainer>
        </HeaderStyle>
        {/* key는 react에서 제공하는 고유식별자 변경 추가 삭제를 식별하는데 사용 */}
        <main key={isKey}>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
