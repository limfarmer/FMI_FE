import { useNavigate } from "react-router-dom";
import SideBarSearchList from "./SideBarSearchList";
/**
 *
 * @returns SideBar
 * 사이드바의 검색기능 컴포넌트
 */
const SideBarSearch = () => {
  const navigate = useNavigate();

  const followListHandleClickEvent = (teamName) => {
    navigate(`/TeamDetailPage/${teamName}`);
    console.log(teamName, "!");
  };

  return (
    <div>
      <SideBarSearchList
        handleEvent={followListHandleClickEvent}
      ></SideBarSearchList>
    </div>
  );
};

export default SideBarSearch;
