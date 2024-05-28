import SideBar from "./SideBar";
import SideBarFooter from "./SideBarFooter";
import { SideBarContainerStyle } from "../../style/LayoutStyle";
const SideBarContainer = ({ isOpen }) => {
  return (
    <>
      <SideBarContainerStyle isOpen={isOpen}>
        <SideBar />
        <SideBarFooter />
      </SideBarContainerStyle>
    </>
  );
};
export default SideBarContainer;
