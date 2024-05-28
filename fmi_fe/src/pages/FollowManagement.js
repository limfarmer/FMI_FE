import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style/MyPage.module.css";

const FollowManagement = ({ userId }) => {
  const [followedTeams, setFollowedTeams] = useState([]);

  useEffect(() => {
    const fetchFollowedTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8182/follow/list", {
          params: { userId: userId },
        });
        setFollowedTeams(response.data);
      } catch (error) {
        console.error("There was an error fetching the followed teams!", error);
      }
    };
    fetchFollowedTeams();
  }, [userId]);

  const handleUnfollow = async (teamId) => {
    try {
      await axios.delete(`http://localhost:8182/follow/${userId}/${teamId}`);
      setFollowedTeams(
        followedTeams.filter((team) => team.teamName !== teamId)
      );
    } catch (error) {
      console.error("There was an error unfollowing the team!", error);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>팔로우한 팀</h2>
      <ul className={styles.followedTeams}>
        {followedTeams.map((team) => (
          <li key={team.teamName} className={styles.followedTeamItem}>
            <span>{team.teamName}</span>
            <button
              className={styles.unfollowButton}
              onClick={() => handleUnfollow(team.teamName)}
            >
              언팔로우
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowManagement;
