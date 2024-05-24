import { useNavigate } from "react-router-dom";
import SideBarSearchList from "./SideBarSearchList";
import styled from "styled-components";
const SideBarSearchStyle = styled.div`
  :nth-child(all) {
  }
`;
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
    <SideBarSearchStyle>
      <SideBarSearchList
        handleEvent={followListHandleClickEvent}
      ></SideBarSearchList>
    </SideBarSearchStyle>
  );
};

export default SideBarSearch;
