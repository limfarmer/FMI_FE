import SideBar from "./SideBar";
import SideBarFooter from "./SideBarFooter";
import { OpenSideBarStyle, BlurDiv } from "../../style/LayoutStyle";
const SideBarOpen = ({ isOpen }) => {
  return (
    <>
      {/* <BlurDiv></BlurDiv> */}
      <OpenSideBarStyle isOpen={isOpen}>
        <SideBar />
        <SideBarFooter />
      </OpenSideBarStyle>
    </>
  );
};
export default SideBarOpen;
