import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const Detail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [FollowTeam, setFollowTeam] = useState(null);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=" +
            FollowTeam
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

  const handleButtonClick = () => {
    setTeamName(FollowTeam);
  };

  return (
    <DetailStyle>
      <div>
        <input
          type="text"
          value={FollowTeam || ""}
          onChange={handleInputChange}
          placeholder="Enter team name"
        />
        <button onClick={handleButtonClick}>Fetch Team Data</button>
        {data &&
          data.map((data, index) => (
            <div key={index}>
              <Logo image={data.strTeamBadge} />
            </div>
          ))}
      </div>
      <div>{data[0] && data[0].strDescriptionEN} section2</div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
      <div>{data[0] && data[0].strDescriptionEN}</div>
    </DetailStyle>
  );
};

export default Detail;
