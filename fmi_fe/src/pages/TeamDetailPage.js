import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailStyle = styled.div`
  display: flex;
  height: 4620px;
  flex-direction: column;
  color: blue;
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
    background-color: white;
  }
  > :nth-child(3) {
    background-color: red;
  }
  > :nth-child(4) {
    background-color: aliceblue;
  }
  > :nth-child(5) {
    background-color: violet;
  }
`;
const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
`;

const TeamDetailPage = () => {
  const { teamName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FollowTeam, setFollowTeam] = useState(null);
  // const [bttTeamName, setBttTeamName] = useState("");
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

  // const handleButtonClick = () => {
  //   setBttTeamName(FollowTeam);
  //   vs();
  // };

  const transformData = (data) => {
    return data.teams.map((team) => {
      return {
        strTeam: team.strTeam,
      };
    });
  };
  const versusData = (event) => {
    return data.teams.map((team) => {
      return {
        strTeam: team.strTeam,
      };
    });
  };

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
  useEffect(() => {
    const vs = async () => {
      try {
        // setVersus([]);
        for (const awayTeam of awayTeams) {
          if (awayTeams.strTeam !== teamName) {
            const response = await axios.get(
              `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${teamName}_vs_${awayTeam.strTeam}`
            );
            const versusData = transformData(response.data);
            console.log(response.data, "결과");
            setVersus(response.data);
          }
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    vs();
  }, [teamName, awayTeams]);

  return (
    <DetailStyle>
      <div>
        <input
          type="text"
          value={teamName}
          onChange={handleInputChange}
          placeholder="Enter team name"
        />
        {/* <button onClick={handleButtonClick}>Fetch Team Data</button> */}

        {data &&
          data.map((data, index) => (
            <div key={index}>
              <Logo image={data.strTeamBadge} />
            </div>
          ))}
      </div>

      <div>{data[0] && data[0].strDescriptionEN} section2</div>
      <div>
        <div>
          <h2>Events</h2>
          <ul>
            {versus &&
              versus.map((versus, index) => (
                <li key={index}>{versus.strEvent}</li>
              ))}
          </ul>
        </div>
      </div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
    </DetailStyle>
  );
};

export default TeamDetailPage;
