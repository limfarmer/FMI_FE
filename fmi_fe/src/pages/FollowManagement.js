import React, { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const FollowManagement = () => {
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    AxiosApi.getFollowList()
      .then((response) => setFollows(response.data))
      .catch((error) =>
        console.error("팔로우 목록을 가져오는 중 오류 발생:", error)
      );
  }, []);

  const handleUnfollow = (teamId) => {
    AxiosApi.unfollowTeam(teamId)
      .then(() => {
        setFollows(follows.filter((follow) => follow.teamId !== teamId));
      })
      .catch((error) => console.error("팔로우 취소 중 오류 발생:", error));
  };

  return (
    <div>
      <h1>팔로우 팀 관리</h1>
      <ul>
        {follows.map((follow) => (
          <li key={follow.teamId}>
            {follow.teamName}
            <button onClick={() => handleUnfollow(follow.teamId)}>
              팔로우 취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowManagement;
