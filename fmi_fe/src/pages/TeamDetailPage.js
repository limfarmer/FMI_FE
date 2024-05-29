import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TeamDetailPage.css";

const FMI_DOMAIN = "http://localhost:8182";

const TeamDetailPage = () => {
  const { teamName } = useParams();
  const [data, setData] = useState([]);
  const [versus, setVersus] = useState([]);
  const [active, setActive] = useState(false);
  const [teamText, setTeamText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`
        );
        setData(response.data.teams);
        setTeamText("팀 연혁");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (teamName) {
      fetchData();
    }
  }, [teamName]);

  const FBtnClick = async () => {
    setActive((prevState) => !prevState);
    const userId = "test";
    try {
      if (active) {
        await axios.delete(
          `${FMI_DOMAIN}/followupdate/delete/${userId}/${teamName}`
        );
      } else {
        await axios.get(
          `${FMI_DOMAIN}/followupdate/insert/${userId}/${teamName}`
        );
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const versusData = (data) => {
    if (!data || !data.event) {
      return [];
    }
    return data.event
      .map((away) => {
        if (away.strSeason === "2023-2024") {
          return {
            strEvent: away.strEvent,
            dateEvent: away.dateEvent,
          };
        }
        return null;
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
        console.error("Error fetching versus data:", error);
      }
    };
    vs();
  }, [teamName]);

  const sortedVersus = versus.sort(
    (a, b) => new Date(b.dateEvent) - new Date(a.dateEvent)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Check visibility initially
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        section.classList.add("visible");
      }
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="detail-page">
      {data.length > 0 && (
        <section className="section">
          <div className="content logo-container">
            <div
              className="logo"
              style={{ backgroundImage: `url(${data[0].strTeamBadge})` }}
            />
            <div>{data[0].strAlternate}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="content">
          <h2>{teamText}</h2>
          <p>{data[0] && data[0].strDescriptionEN}</p>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <h2>경기 일정</h2>
          <ul>
            {versus &&
              sortedVersus.map((versusItem, index) => (
                <li key={index}>
                  {versusItem.strEvent} : {versusItem.dateEvent}
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <h2>홈구장</h2>
          <p>{data[0] && data[0].strStadiumDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <h2>웹사이트 및 소셜미디어</h2>
          <p>
            웹사이트 :{" "}
            <a
              href={data[0] && `http://${data[0].strWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data[0] && data[0].strWebsite}
            </a>
          </p>
          <p>
            페이스북 :{" "}
            <a
              href={data[0] && `http://${data[0].strFacebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data[0] && data[0].strFacebook}
            </a>
          </p>
          <p>
            트위터 :{" "}
            <a
              href={data[0] && `http://${data[0].strTwitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data[0] && data[0].strTwitter}
            </a>
          </p>
          <p>
            인스타그램 :{" "}
            <a
              href={data[0] && `http://${data[0].strInstagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data[0] && data[0].strInstagram}
            </a>
          </p>
        </div>
      </section>
      <div
        className={`follow-btn ${active ? "active" : ""}`}
        onClick={FBtnClick}
      ></div>
    </div>
  );
};

export default TeamDetailPage;
