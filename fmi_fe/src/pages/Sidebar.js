import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "api/AxiosApi";
import axios from "axios";

const transformData = (data) => {
  return data.teams.map((team) => {
    return Object.entries(team).map(([key, value]) => ({ key, value }));
  });
};

const SideBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState(null);
  const [list, setList] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [teamsArray, setTeamsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /**
   * @function
   * 입력창에 결과값을 실시간으로 저장해주는 onChange함수
   * @param {*} e
   * 검색창에 입력한 event값
   *
   */
  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <>
      <input type="text" onChange={handleSearch} />
      {/* <SideBarList result={inputValue}></SideBarList> */}
      {/* {teamsArray &&
        teamsArray.map((team, index) => (
          <div key={index}>
            {team.strTeam} , {team.strLeague}
          </div>
        ))} */}
      {teamsArray.map((team, index) => (
        <div key={index}>
          {team.map(({ key, value }) => (
            <p key={key}>
              {value} , {key.strLeague}
            </p>
          ))}
        </div>
      ))}
    </>
  );
};
export default SideBar;
