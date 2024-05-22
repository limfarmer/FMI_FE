import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarStyle = styled.div``;
export const OpenSideBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  top: 0;
  right: 0;
  height: 1024px;
  width: 250px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.4s ease-in-out;
`;

export const SidebarItem = styled.div``;

export const HamburgerButton = styled.button`
  z-index: 1000;
  width: 30px;
  height: 30px;
  background-color: white;
  margin-right: 30px;
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
