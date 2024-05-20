import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 20px;
  background-color: #f1f1f1;
  text-align: center;
  margin-top: 20px;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const FooterTitle = styled.h2`
  margin: 0;
`;

const FooterText = styled.p`
  margin: 10px 0;
`;

const FooterLink = styled.a`
  margin: 0 10px;
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
`;
const SideBarFooter = () => {
  return (
    <FooterContainer>
      <FooterTitle>FMI</FooterTitle>
      <FooterText>
        Follow your favorite football teams and stay updated with the latest
        information!
      </FooterText>
      <FooterText>&copy; 2024 FMI. All rights reserved.</FooterText>
      <FooterText>
        Contact us:{" "}
        <FooterLink href="mailto:support@fmi.com">support@fmi.com</FooterLink>
      </FooterText>
      <FooterText>
        Follow us on:
        <FooterLink href="" target="_blank" rel="noopener noreferrer">
          Facebook
        </FooterLink>{" "}
        |
        <FooterLink href="" target="_blank" rel="noopener noreferrer">
          Twitter
        </FooterLink>{" "}
        |
        <FooterLink href="" target="_blank" rel="noopener noreferrer">
          Instagram
        </FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default SideBarFooter;
