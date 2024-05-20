import React, { useEffect, useState } from "react";
import FootballApiData from "../FootballApiData";

/**
 *
 * @returns SideBar
 * 사이드바의 검색기능 컴포넌트
 */
const SideBarSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const { teamsArray, playerArray, loading } = FootballApiData(inputValue);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };
  /**
   * filter로 공백을 제거한 검색값 비교하는 함수
   */
  const filteredTeamResult = teamsArray.filter((team) => {
    /**
     * 입력값 공백제거 함수
     */
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();

    /**
     * api 정보의 팀이름 공백제거 함수
     */
    const trimmedTeamName = team.strTeam.replace(/\s+/g, "").toLowerCase();

    /**
     * includes로 포함되어 있는지 확인후 return
     */
    return trimmedTeamName.includes(trimmedInputValue);
  });

  /**
   * filter로 공백을 제거한 검색값 비교하는 함수
   */
  const filteredPlayerResult = playerArray.filter((team) => {
    /**
     * 입력값 공백제거 함수
     */
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();

    /**
     * api 정보의 팀이름 공백제거 함수
     */
    const trimmedPlayerName = team.strPlayer.replace(/\s+/g, "").toLowerCase();

    /**
     * includes로 포함되어 있는지 확인후 return
     */
    return trimmedPlayerName.includes(trimmedInputValue);
  });

  return (
    <div>
      <input
        type="text"
        placeholder="팀이름이나 선수이름 입력하세요."
        value={inputValue}
        onChange={handleSearchChange}
      />
      {inputValue &&
        filteredTeamResult.map((team, index) => (
          <div key={index}>
            <p>
              <strong>logo:</strong>{" "}
              <img
                src={team.strTeamBadge}
                alt={`${team.strTeam}badge`}
                style={{ width: "50px", height: "50px" }}
              />
            </p>
            <p>
              <strong>Team:</strong> {team.strTeam}
            </p>
          </div>
        ))}
      {inputValue &&
        filteredPlayerResult.map((team, index) => (
          <div key={index}>
            <p>
              <strong>Team:</strong> {team.strTeam}
            </p>
            <p>
              <strong>Player:</strong> {team.strPlayer}
            </p>
          </div>
        ))}
    </div>
  );
};

export default SideBarSearch;
