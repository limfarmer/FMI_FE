import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
const FollowListItem = styled.button``;
const FollowList = ({ handleClickEvent }) => {
  // 로그인 구현이 안돼서 일단 임시로 id입력 받는 코드 구현
  const [dummyId, setDummyId] = useState("");
  const insertDummyId = (e) => {
    setDummyId(e.target.value);
  };
  // 여기까지이고 로그인  구현되면 지울 예정
  const [followList, setFollowList] = useState([]);
  /**
   * 팔로우 리스트 불러오는 useEffect
   */
  useEffect(() => {
    const getFollowList = async () => {
      try {
        const response = await AxiosApi.followList(dummyId);
        if (response.data) {
          setFollowList(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFollowList();
  }, [dummyId]);
  return (
    <>
      <input type="text" value="test" onChange={insertDummyId} />
      {followList &&
        followList.map((list, index) => (
          <FollowListItem
            onClick={() => handleClickEvent(list.teamName)}
            key={index}
          >
            {list.teamName}
          </FollowListItem>
        ))}
    </>
  );
};
export default FollowList;
