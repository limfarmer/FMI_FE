import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 *
 * @returns SideBar
 * 사이드바의 검색기능 컴포넌트
 */
const SideBarSearch = () => {
  const [teamsArray, setTeamsArray] = useState([]); // api에서 받아온 데이터를 담는 객체
  const [playerArray, setPlayerArray] = useState([]); // api에서 받아온 데이터를 담는 객체
  const [loading, setLoading] = useState(true); // 정보 나오기 전까지의 로딩 상태 관리 loading창 구현할 경우 활용 예정
  const [inputValue, setInputValue] = useState("");

  // **** 팀 검색 로직 ****

  /**
   *
   * @param {*} api에서 받아오는 JSON 데이터
   * @returns 팀과 팀 로고만 배열에 담음
   */
  const transformData = (data) => {
    return data.teams.map((team) => {
      return {
        strTeam: team.strTeam,
        strTeamBadge: team.strTeamBadge,
      };
    });
  };

  /**
   * 축구 api의 정보를 가져와서 TeamsArray에 담는 hook
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga"
        );
        const transformedData = transformData(response.data);
        console.log("!");
        setTeamsArray(transformedData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   *
   * @param {*} input창에 입력값을 받는 event 핸들러
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

  // **** 여기서 부턴 선수 검색 로직 ****

  /**
   *
   * @param {*} api에서 받아오는 JSON 데이터
   * @returns 선수, 선수의 팀을 반환
   */
  const transformPlayerData = (data) => {
    return data.player.map((player) => {
      return {
        strPlayer: player.strPlayer,
        strTeam: player.strTeam,
      };
    });
  };
  /**
   * 선수 데이터를 가지고 오는 api 불러오고
   * input입력값에 따라 상태 관리를 하는 hook
   */
  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.trim() === "") return;
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue.trim()}`
        );
        console.log(response.data, "!");
        const transformedData = transformPlayerData(response.data);
        setPlayerArray(transformedData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputValue]);

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
