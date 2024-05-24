import styled from "styled-components";
import { Link } from "react-router-dom";
// 사이드바 style 파일 만들기!!!!!
export const SidebarStyle = styled.div``;
export const OpenSideBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #333;
  color: white;
  top: 0;
  right: 0;
  height: 1024px;
  width: 340px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.4s ease-in-out;
`;
export const BlurDiv = styled.div``;
export const SidebarItem = styled.div``;
// export const SideBarBlur = styled.div`
//   width: 70%;
//   height: 100rem;
//   position: absolute;
//   background-color: rgba(128, 128, 128, 0.8);
//   top: 0;
//   left: 0;
//   display: ${(props) => (props.isOpen ? "none" : "block")};
// `;

export const HamburgerButton = styled.button`
  z-index: 1000;
  width: 5%;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-items: center;

  & div {
    width: 100%;
    height: 3px;
    background-color: #333;
    border-radius: 5px;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #3498db;
  }
`;
