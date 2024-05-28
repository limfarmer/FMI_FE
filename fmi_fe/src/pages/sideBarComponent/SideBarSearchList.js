import { useState } from "react";
import FootballApiData from "../../api/FootballApiData";
import styled, { keyframes } from "styled-components";

/** 검색 결과 list 스타일 */
const SearchResult = styled.button`
  border: none;
  outline: none;
  display: inline-block;
  background-color: inherit;
  cursor: pointer;

  & div {
    white-space: nowrap;
  }
`;
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`;

const SearchBarStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80%;
  height: 3.5%;
  top: 1rem;
  color: black;
`;
const Input = styled.input`
  border: none;
  outline: none;
  background-color: #f1f1f1;
  height: 100%;
  margin-top: 1.3rem;
  padding: 10px;
  border-radius: ${(props) =>
    props.value !== "" ? "20px 20px 0px 0px" : "30px "};
  border-bottom: ${(props) => (props.value !== "" ? "0.1px solid" : "0px")};
  transition: ${(props) => (props.value !== "" ? "0.1px solid" : "0px")};
`;
const Ul = styled.ul`
  display: ${(props) => (props.showList ? "inline-block" : "none")};
  background-color: #f1f1f1;
  list-style: none;
  border-radius: 0px 0px 20px 20px;
  padding: 0;
  z-index: 1;
  padding-left: 14px;
  margin: 0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
`;
const SideBarSearchList = ({ handleEvent }) => {
  const [inputValue, setInputValue] = useState("");
  const { teamsArray, playerArray, loading } = FootballApiData(inputValue);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * @param {event} event input창에 입력한값을 상태관리하는 handler
   */
  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * filter로 공백을 제거한 팀 검색값 비교하는 함수
   */
  const filteredTeamResult = teamsArray.filter((team) => {
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();
    const trimmedTeamName = team.strTeam.replace(/\s+/g, "").toLowerCase();
    return trimmedTeamName.includes(trimmedInputValue);
  });

  /**
   * filter로 공백을 제거한 선수 검색값 비교하는 함수
   */
  const filteredPlayerResult = playerArray.filter((player) => {
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();
    const trimmedPlayerName = player.strPlayer
      .replace(/\s+/g, "")
      .toLowerCase();
    const trimmedTeamName = player.strTeam.replace(/\s+/g, "").toLowerCase();

    // "_retiredsoccer""를 제외 (은퇴한 선수들)
    const isNotRetired = trimmedTeamName !== "_retiredsoccer";
    // "남자", "축구", "선수" 만 검색하도록 조건문 걸어줌
    if (
      player.strSport === "Soccer" &&
      player.strGender === "Male" &&
      player.strPosition !== "Manager" &&
      !/\d/.test(player.strPlayer) &&
      isNotRetired
    ) {
      return trimmedPlayerName.includes(trimmedInputValue);
    }
    return false;
  });

  return (
    <SearchBarStyle>
      <Input
        type="text"
        placeholder="팀이름이나 선수이름 입력하세요."
        value={inputValue}
        onChange={handleSearchChange}
      />

      {/* 입력값이 있을 때만 리스트를 표시 */}
      <Ul showList={inputValue !== ""}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredTeamResult.length > 0 ? (
              filteredTeamResult.map((team, index) => (
                <li key={index}>
                  <SearchResult onClick={() => handleEvent(team.strTeam)}>
                    <div>
                      <img
                        src={team.strTeamBadge}
                        alt={`${team.strTeam} badge`}
                        style={{ width: "24px", height: "24px" }}
                      />
                      Team: {team.strTeam}
                    </div>
                  </SearchResult>
                </li>
              ))
            ) : (
              <SearchResult>
                <li>no team result</li>
              </SearchResult>
            )}
            {filteredPlayerResult.length > 0 ? (
              filteredPlayerResult.map((player, index) => (
                <li key={index}>
                  <SearchResult onClick={() => handleEvent(player.strTeam)}>
                    <div>Player: {player.strPlayer}</div>
                  </SearchResult>
                </li>
              ))
            ) : (
              <SearchResult>
                <li>no player result</li>
              </SearchResult>
            )}
            <li style={{ paddingBottom: "10px" }}></li>
          </>
        )}
      </Ul>
    </SearchBarStyle>
  );
};

export default SideBarSearchList;
