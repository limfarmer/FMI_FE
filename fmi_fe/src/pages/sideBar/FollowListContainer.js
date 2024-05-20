import axios from "axios";
import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import FollowList from "./FollowList";

const FollowListContainer = () => {
  const navigate = useNavigate();

  const handleClickEvent = (teamName) => {
    navigate(`/TeamDetailPage/${teamName}`);
    console.log(teamName, "!");
  };

  return (
    <>
      <FollowList handleClickEvent={handleClickEvent} />
    </>
  );
};
export default FollowListContainer;
