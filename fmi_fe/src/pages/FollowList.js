import axios from "axios";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const FollowList = () => {
  const [followList, setFollowList] = useState([]);
  const [dummyId, setDummyId] = useState("");

  const insertDummyId = (e) => {
    setDummyId(e.target.value);
  };
  /**
   * 팔로우 리스트 불러오기
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
      <p>아이디 값 넘어오기 전까지 더미 아이디 입력하는 input 창</p>
      <input type="text" value={dummyId} onChange={insertDummyId} />
      {followList &&
        followList.map((list, index) => <div key={index}>{list.teamName}</div>)}
    </>
  );
};
export default FollowList;
