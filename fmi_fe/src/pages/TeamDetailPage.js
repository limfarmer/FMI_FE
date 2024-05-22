import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
const FMI_DOMAIN = "http://localhost:8182";

const FollowBtn = styled.div`
  /*팔로우버튼 스타일 */
  .FollowBtn {
    width: 50px;
    height: 45px;
    background-color: ${(props) => (props.active ? "red" : "gray")};
    position: relative;
    transform: rotate(-45deg);
    border: none;
    cursor: pointer;
    padding: 0;
    position: absolute;
    bottom: 50px;
    right: 50px;
  }

  .FollowBtn::before,
  .FollowBtn::after {
    content: "";
    width: 50px;
    height: 45px;
    background-color: ${(props) => (props.active ? "red" : "gray")};
    border-radius: 50%;
    position: absolute;
  }

  .FollowBtn::before {
    top: -25px;
    left: 0;
  }

  .FollowBtn::after {
    top: 0;
    left: 25px;
  }
`;

const DetailStyle = styled.div`
  /* 상세페이지 전체적인 스타일 */
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  color: #2e2c2f;

  > * {
    min-height: 924px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    font-size: 30px;
    font-weight: lighter;
    width: 100%;
  }
  /* 768px 밑이면 모바일화면임 */
  @media screen and (max-width: 768px) {
    > * {
      flex-wrap: wrap;
    }
  }
  > :nth-child(1) {
    /**section 1 */
    background-color: #e9eae8;
    display: flex;
    flex-direction: column;
    font-size: 50px;
    font-weight: lighter;
    padding: 20px;
    box-sizing: border-box;
  }
  > :nth-child(2) {
    /*section2*/
    background-color: #e3e4e6;
    padding: 20px;
    box-sizing: border-box;
  }

  > :nth-child(3) {
    /*section3*/
    background-color: #e9eae8;
    padding: 20px;
    box-sizing: border-box;
  }
  > :nth-child(4) {
    /*section4*/
    background-color: #e3e4e6;
    padding: 20px;
    box-sizing: border-box;
  }
  > :nth-child(5) {
    /*section5*/
    background-color: #e9eae8;
    padding: 20px;
    box-sizing: border-box;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration-line: none;
    text-decoration: none;
    color: #2e2c2f;
  }
  a:hover {
    color: purple;
  }
`;

const LogoContainer = styled.div`
  /*로고 컨테이너  */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  /*로고 스타일*/
  width: 400px;
  height: 400px;
  justify-content: center;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
`;

const VsDateStyle = styled.div`
  ul {
    column-count: 2; /* 세로로 두 줄로 만듭니다. */
  }
`;

const TeamDetailPage = () => {
  /*전체상세페이지*/
  const { teamName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FollowTeam, setFollowTeam] = useState(null);
  const [versus, setVersus] = useState([]);
  const [awayTeams, setAwayTeams] = useState([]);
  const [active, setActive] = useState(false);

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

  const FBtnClick = async () => {
    const follow = { teamName: teamName };
    setActive((prevState) => !prevState);
    return await axios.get(FMI_DOMAIN + `/follow${teamName}`);
  };

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
    /* awayTeam뽑아주기*/
    if (!data || !data.event) {
      return []; // 데이터가 없는 경우 빈 배열 반환
    }

    return data.event
      .map((away) => {
        if (away.strSeason === "2023-2024") {
          return {
            strEvent: away.strEvent,
            dateEvent: away.dateEvent,
          };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null);
  };

  useEffect(() => {
    /* 첫번째 api에서 전체 경기리스트 뽑아내고 두번째 api에서 내팔로우팀과 awayTeam경기 리스트 뽑기 */
    const vs = async () => {
      try {
        const awayTeamsResponse = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League`
        );
        const awayTeams = awayTeamsResponse.data.teams.map(
          (team) => team.strTeam
        );
        const versusDataArray = await Promise.all(
          /*2차원 배열을 1차원으로 바꿔주는 거라는데 잘모르겠음... */
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
  const sortedVersus = versus.sort(
    /*경기일정을 내림차순 해주는 코드*/
    (a, b) => new Date(b.dateEvent) - new Date(a.dateEvent)
  );
  return (
    <DetailStyle>
      <seition1>
        {data &&
          data.map((data, index) => (
            <div key={index}>
              <LogoContainer>
                <Logo image={data.strTeamBadge} />{" "}
                <div>{data.strAlternate}</div>
                <FollowBtn active={active} onClick={FBtnClick}>
                  <button className="FollowBtn"></button>
                </FollowBtn>
              </LogoContainer>
            </div>
          ))}
      </seition1>

      <section2>
        <div>
          <h2>팀연혁</h2>
          {data[0] && data[0].strDescriptionEN}
        </div>
      </section2>

      <seition3>
        <VsDateStyle>
          <h2>경기일정</h2>
          <ul>
            {versus &&
              sortedVersus.map((versusItem, index) => (
                <li className="vsdate" key={index}>
                  <div>
                    {versusItem.strEvent} : {versusItem.dateEvent}
                  </div>
                </li>
              ))}
          </ul>
        </VsDateStyle>
      </seition3>

      <seition4>
        <div>
          <h2>홈구장</h2>
          {data[0] && data[0].strStadiumDescription}
        </div>
      </seition4>

      <section5>
        <VsDateStyle>
          <div>
            웹사이트:{" "}
            <a href={data[0] && `http://${data[0].strWebsite}`} target="blank">
              {data[0] && data[0].strWebsite}
            </a>
          </div>
          <div>
            페이스북:{" "}
            <a href={data[0] && `http://${data[0].strFacebook}`} target="blank">
              {data[0] && data[0].strFacebook}
            </a>
          </div>
          <div>
            {" "}
            트위터:{" "}
            <a href={data[0] && `http://${data[0].strTwitter}`} target="blank">
              {data[0] && data[0].strTwitter}
            </a>
          </div>
          <div>
            인스타그램:{" "}
            <a
              href={data[0] && `http://${data[0].strInstagram}`}
              target="blank"
            >
              {data[0] && data[0].strInstagram}
            </a>{" "}
          </div>
        </VsDateStyle>
      </section5>
    </DetailStyle>
  );
};

export default TeamDetailPage;
