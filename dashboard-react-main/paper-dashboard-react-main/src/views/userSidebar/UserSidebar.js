import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "api/AxiosApi";
import axios from "axios";

const UserSideBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState(null);
  const [list, setList] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [state, setState] = useState("");
  /**
   * @function
   * 입력창에 결과값을 실시간으로 저장해주는 onChange함수
   * @param {*} e
   * 검색창에 입력한 event값
   *
   */
  const handleSearch = (e) => {
    // setInputValue(e.target.value);
    let nextState = {};
    nextState[e.targer.name] = e.target.value;
    this.setState(nextState); // 안되면 this 추가해보기
  };
  /**
   * 축구api받아오
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga"
        );
        setResults(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const checkResult = () => {
  //     const finalList = results;
  //     for (let i of finalList) {
  //       if (inputValue === i.strTeam) {
  //         list.concat(i);
  //       }
  //     }
  //   };
  //   checkResult();
  // }, [inputValue, list, results]);

  return (
    <>
      <input
        type="text"
        name="searchKeyword"
        value={this.state.searchKeyword}
        onChange={handleSearch}
      />
      {/* <SideBarList result={inputValue}></SideBarList> */}
      {list &&
        list.map((list) => (
          <div key={list.idTeam}>
            {list.strTeam} , {list.strLeague}
          </div>
        ))}
    </>
  );
};
export default UserSideBar;
