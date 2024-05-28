import SideBarSearch from "./SideBarSearch";
import FollowListContainer from "./FollowListContainer";
import HeaderMenu from "../HeaderMenu";
import styled from "styled-components";
const SideHeaderMenuStyle = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 10%;
    & a {
      width: 80%;
      text-align: center;
      color: #f1f1f1;
      margin-top: 10px;
      border-radius: 10px;
      border: 2px solid;
    }
  }
`;
const SideBar = () => {
  return (
    <>
      <SideBarSearch />
      <SideHeaderMenuStyle>
        <HeaderMenu />
      </SideHeaderMenuStyle>
      <FollowListContainer />
    </>
  );
};
export default SideBar;
