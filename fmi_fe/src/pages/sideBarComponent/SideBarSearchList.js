import { useState } from "react";
import FootballApiData from "../../api/FootballApiData";
import styled from "styled-components";

/** 검색 결과 list 스타일 */
const SearchResult = styled.button`
  border: none;
  outline: none;
  color: black;
  display: inline-block;
  background-color: inherit;
  cursor: pointer;
  & div {
    white-space: nowrap;
  }
`;

const SearchBarStyle = styled.div`
  width: 100%;
  height: 3%;
  position: fixed;
  top: 1rem;
  left: 1rem;
`;
const Input = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #f1f1f1;
  padding: 0;
  border-radius: ${(props) =>
    props.value !== "" ? "20px 20px 0px 0px" : "30px "};
  display: inline-block;
  border-bottom: ${(props) => (props.value !== "" ? "0.1px solid" : "0px")};
`;
const Ul = styled.ul`
  display: inline-block;
  width: 90%;
  background-color: #f1f1f1;
  list-style: none;
  border-radius: 0px 0px 20px 20px;

  padding: 0;
  margin: 0;
`;
const SideBarSearchList = ({ handleEvent }) => {
  const [inputValue, setInputValue] = useState("");
  const { teamsArray, playerArray } = FootballApiData(inputValue);

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

    // "_Retired Soccer"와 "_Retired WWE"를 제외
    const isNotRetired =
      trimmedTeamName !== "_retiredsoccer" && trimmedTeamName !== "_retiredwwe";

    if (
      player.strSport === "Soccer" &&
      player.strGender === "Male" &&
      player.strPosition !== "Manager" &&
      isNotRetired
    ) {
      return trimmedPlayerName.includes(trimmedInputValue);
    }
    return false;
  });

  return (
    <>
      <SearchBarStyle>
        {/* 인풋 디자인 바꾸기 */}
        <Input
          type="text"
          placeholder="팀이름이나 선수이름 입력하세요."
          value={inputValue}
          onChange={handleSearchChange}
        />
        <Ul style={{}}>
          {inputValue && (
            <>
              {filteredTeamResult.map((team, index) => (
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
              ))}
              <li>----</li>
              {filteredPlayerResult.map((player, index) => (
                <li key={index}>
                  <SearchResult onClick={() => handleEvent(player.strTeam)}>
                    <div>Player: {player.strPlayer}</div>
                  </SearchResult>
                </li>
              ))}
            </>
          )}
        </Ul>
      </SearchBarStyle>
    </>
  );
};

export default SideBarSearchList;
