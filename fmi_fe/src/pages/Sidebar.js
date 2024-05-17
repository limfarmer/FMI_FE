import React, { useEffect, useState } from "react";
import axios from "axios";

// 키-값 쌍의 객체 배열로 변환하는 함수
const transformData = (data) => {
  return data.teams.map((team) => {
    return {
      strTeam: team.strTeam,
      strCountry: team.strCountry,
      strTeamBadge: team.strTeamBadge,
    };
  });
};
/**
 *
 * @returns SideBar
 * 사이드바 컴포넌트
 */
const SideBar = () => {
  const [teamsArray, setTeamsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * 축구 api의 정보를 가져와서 TeamsArray에 담는 useEffect
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga"
        );
        const transformedData = transformData(response.data);
        setTeamsArray(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Danny_Welbeck 선수 검색!~
  /**
   *
   * @param {*} input창에 입력값을 받는 event 핸들러
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  /**
   * teamsArray
   */
  const filteredTeams = teamsArray.filter((team) => {
    return (
      team.strTeam &&
      team.strTeam.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by team or country"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm &&
        filteredTeams.map((team, index) => (
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
    </div>
  );
};

export default SideBar;
