import SideBar from "./SideBar";
import SideBarFooter from "./SideBarFooter";
import { OpenSideBarStyle } from "../../style/LayoutStyle";
const SideBarOpen = ({ isOpen }) => {
  return (
    <>
      <OpenSideBarStyle isOpen={isOpen}>
        <SideBar />
        <SideBarFooter />
      </OpenSideBarStyle>
    </>
  );
};
export default SideBarOpen;
