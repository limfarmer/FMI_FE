import axios from "axios";
import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import FootballApiData from "../FootballApiData";
import styled from "styled-components";
/** 검색 결과 list 스타일 */
const SearchResult = styled.button``;
const SearchBarStyle = styled.div`
  width: 100%;
  position: fixed;
  top: 1rem;
  left: 1rem;
  & input {
    width: 70%;
  }
`;

const SideBarSearchList = ({ handleEvent }) => {
  const [inputValue, setInputValue] = useState("");
  const { teamsArray, playerArray } = FootballApiData(inputValue);
  /**
   *
   * @param {event} inputValue input창에 입력한값을 상태관리하는 handler
   */
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
    <>
      <SearchBarStyle>
        <input
          type="text"
          placeholder="팀이름이나 선수이름 입력하세요."
          value={inputValue}
          onChange={handleSearchChange}
        />
      </SearchBarStyle>
      {inputValue &&
        filteredTeamResult.map((team, index) => (
          <SearchResult onClick={() => handleEvent(team.strTeam)} key={index}>
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
          </SearchResult>
        ))}
      {inputValue &&
        filteredPlayerResult.map((team, index) => (
          <SearchResult onClick={() => handleEvent(team.strTeam)} key={index}>
            <div key={index}>
              <p>
                <strong>Team:</strong> {team.strTeam}
              </p>
              <p>
                <strong>Player:</strong> {team.strPlayer}
              </p>
            </div>
          </SearchResult>
        ))}
    </>
  );
};
export default SideBarSearchList;
