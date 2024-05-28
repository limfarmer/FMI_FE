import React from "react";
import { StyledLink } from "../style/LayoutStyle";

const HeaderMenu = ({ onClick, userId }) => {
  return (
    <>
      <StyledLink to="/" onClick={onClick}>
        HOME
      </StyledLink>
      <StyledLink to="/">ABOUT US</StyledLink>
      <StyledLink to="/">CONTACT</StyledLink>
      {userId && <StyledLink to="/mypage">MY PAGE</StyledLink>}
    </>
  );
};

export default HeaderMenu;
