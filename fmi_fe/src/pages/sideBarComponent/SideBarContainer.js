import { HamburgerButton } from "../../style/LayoutStyle";
import { useEffect, useRef, useState } from "react";
import SideBarOpen from "./SideBarOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SidebarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // 현재 사이드바의 DOM 상태를 관리할 Ref hook 선언

  const handleClickOutside = (event) => {
    if (
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside); // EventListener 남아있으면 메모리 누수가 있어서 제거하는것
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div ref={sidebarRef}>
        <HamburgerButton onClick={onClick}>
          <FontAwesomeIcon
            icon={faBars}
            style={{
              color: "white",
              width: "35px",
              height: "30px",
              cursor: "pointer",
            }}
          />
        </HamburgerButton>
        <SideBarOpen isOpen={isOpen}></SideBarOpen>
      </div>
    </>
  );
};
export default SidebarContainer;
