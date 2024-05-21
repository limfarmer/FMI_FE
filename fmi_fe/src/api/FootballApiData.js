import { useEffect, useState } from "react";
import axios from "axios";
/**
 * 팀 이름, 선수 이름 리스트 불러오는 컴포넌트 따로 빼놓음
 * (Context API로 빼야되나 고민중)
 * @param {}inputValue 검색어 입력값에 따른 결과값 출력
 * @returns 검색어에 맞는 팀이름 or 선수 이름
 */
const FootballApiData = (inputValue) => {
  const [teamsArray, setTeamsArray] = useState([]); // api에서 받아온 데이터를 담는 객체
  const [playerArray, setPlayerArray] = useState([]); // api에서 받아온 데이터를 담는 객체
  const [loading, setLoading] = useState(true); // 정보 나오기 전까지의 로딩 상태 관리 loading창 구현할 경우 활용 예정

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
      if (inputValue.trim() === "") return;
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`
        );
        console.log(response.data, "!");
        const transformedData = transformData(response.data);
        setTeamsArray(transformedData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputValue]);

  /**
   *
   * @param {*} input창에 입력값을 받는 event 핸들러
   */

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
        const transformedData = transformPlayerData(response.data);
        setPlayerArray(transformedData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, [inputValue]);

  return { teamsArray, playerArray, loading };
};

export default FootballApiData;
