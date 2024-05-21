import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailStyle = styled.div`
  display: flex;
  height: 4620px;
  flex-direction: column;
  color: black;
  > * {
    height: 924px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 1px;
  }
  > :nth-child(1) {
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > :nth-child(2) {
    background-color: aliceblue;
  }
  > :nth-child(3) {
    background-color: aliceblue;
  }
  > :nth-child(4) {
    background-color: aliceblue;
  }
  > :nth-child(5) {
    background-color: aliceblue;
  }
  li {
    list-style-type: none;
  }
`;
const Logo = styled.div`
  width: 300px;
  height: 300px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
`;

const TeamDetailPage = () => {
  const { teamName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FollowTeam, setFollowTeam] = useState(null);
  const [versus, setVersus] = useState([]);
  const [awayTeams, setAwayTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=" +
            teamName
        );
        setData(response.data.teams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (teamName) {
      fetchData();
    }
  }, [teamName]);

  const handleInputChange = (event) => {
    setFollowTeam(event.target.value);
  };

  const transformData = (data) => {
    return data.teams.map((team) => {
      return {
        strTeam: team.strTeam,
      };
    });
  };

  const versusData = (data) => {
    if (!data || !data.event) {
      return []; // 데이터가 없는 경우 빈 배열 반환
    }

    return data.event
      .map((away) => {
        if (away.strSeason === "2023-2024") {
          return {
            strEvent: away.strEvent,
          };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null);
  };

  useEffect(() => {
    const vs = async () => {
      try {
        const awayTeamsResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`
        );
        const awayTeams = awayTeamsResponse.data.teams.map(
          (team) => team.strTeam
        );
        const versusDataArray = await Promise.all(
          awayTeams.map(async (awayTeam) => {
            const response = await axios.get(
              `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${teamName}_vs_${awayTeam}`
            );
            return versusData(response.data);
          })
        );
        const flattenedVersusData = versusDataArray.flat();
        setVersus(flattenedVersusData);
      } catch (error) {
        console.error("error", error);
      }
    };
    vs();
  }, [teamName]);

  useEffect(() => {
    /* awayteam받아오는api */
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`
        );
        const transformedData = transformData(response.data);
        console.log(transformedData, "!");
        setAwayTeams(transformedData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DetailStyle>
      <div>
        {data &&
          data.map((data, index) => (
            <div key={index}>
              <Logo image={data.strTeamBadge} />
              <div>{data.strAlternate}</div>
            </div>
          ))}
      </div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
      <div>
        <h2>경기일정</h2>
        <ul>
          {versus &&
            [...new Set(versus.map((versus) => versus.strEvent))].map(
              (uniqueEvent, index) => <li key={index}>{uniqueEvent}</li>
            )}
        </ul>
      </div>

      <div>{data[0] && data[0].strStadiumDescription}</div>
      <div>
        <p>웹사이트: {data[0] && data[0].strWebsite}</p>
        <div> 페이스북: {data[0] && data[0].strFacebook}</div>
        <div> 트위터: {data[0] && data[0].strTwitter}</div>
        <div> 인스타그램: {data[0] && data[0].strInstagram}</div>
      </div>
    </DetailStyle>
  );
};

export default TeamDetailPage;
