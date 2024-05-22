import { HamburgerButton } from "../../style/LayoutStyle";
import { useState } from "react";
import SideBarOpen from "./SideBarOpen";
const SidebarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <HamburgerButton onClick={onClick} />
      <SideBarOpen isOpen={isOpen}></SideBarOpen>
    </>
  );
};
export default SidebarContainer;
