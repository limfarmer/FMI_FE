import { HamburgerButton, SideBarBlur } from "../../style/LayoutStyle";
import { useEffect, useRef, useState } from "react";
import SideBarOpen from "./SideBarOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SidebarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // 현재 사이드바의 DOM 상태를 관리할 Ref hook 선언
  /**
   * @param {event} click 사이드바의 영역을 제외한 부분을 click을 sidebarRef.current로 확인후
   * 그외 부분을 클릭시(!sidebarRef.current.contains(event.target)) setIsOpen을 false로 바꿔 닫음
   */
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      // console.log("너니?");
      setIsOpen(false);
    }
  };
  /**
   * document 접근 후 EventLister를 이용해서 isOpen의 상태관리
   */
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
    console.log("클릭", isOpen);
  };

  return (
    <>
      {/* 사이드 바의 전체 감싸는 div */}
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
        {/* <SideBarBlur ref={sidebarRef}></SideBarBlur> */}
        <SideBarOpen isOpen={isOpen}></SideBarOpen>
      </div>
    </>
  );
};
export default SidebarContainer;
