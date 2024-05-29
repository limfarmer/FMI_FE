import React from "react";
import { StyledLink } from "../style/LayoutStyle";

const HeaderMenu = ({ onClick, userId }) => {
  return (
    <>
      <StyledLink to="/" onClick={onClick}>
        HOME
      </StyledLink>
      <StyledLink to="/notice">NOTICE</StyledLink>
      <StyledLink to="/faq">FAQ</StyledLink>
      {userId && <StyledLink to="/mypage">MY PAGE</StyledLink>}
    </>
  );
};

export default HeaderMenu;
