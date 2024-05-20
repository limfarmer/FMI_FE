import axios from "axios";
import { useEffect } from "react";

const FollowList = () => {
  /**
   * 팔로우 리스트 불러오기
   */
  useEffect(() => {
    const getFollowList = async () => {
      try {
        const response = await axios;
      } catch (e) {
        console.log(e);
      }
    };
  }, []);
  return;
};
export default FollowList;
