import axios from "axios";
import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

const FollowListContainer = () => {
  // 로그인 구현이 안돼서 일단 임시로 id입력 받는 코드 구현
  const [dummyId, setDummyId] = useState("");
  const insertDummyId = (e) => {
    setDummyId(e.target.value);
  };
  // 여기까지이고 로그인 구현되면 지울 예정
  const navigate = useNavigate();
  const [followList, setFollowList] = useState([]);
  const handleClickEvent = () => {
    navigate("/TeamDetailPage");
  };
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
      <p>
        아이디 값 넘어오기 전까지 더미 아이디 입력하는 input 창 space누르면 나옴
      </p>
      <input type="text" value="test" onChange={insertDummyId} />
      <followList handleClickEvent={handleClickEvent} />
      {followList &&
        followList.map((list, index) => <div key={index}>{list.teamName}</div>)}
    </>
  );
};
export default FollowListContainer;
