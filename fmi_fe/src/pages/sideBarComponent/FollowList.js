import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
const FollowListItem = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  width: 100%;

  cursor: pointer;
`;
const FollowListBoxStyle = styled.div`
  background-color: #f1f1f1;
  width: 80%;
  height: 50%;
  margin-left: 5px;
  margin-right: 5px;
`;
const FollowListTable = styled.table`
  color: #2e2c2f;
  width: 100%;
  font-size: 1rem;
`;
// 테이블 행 스타일
const TableRow = styled.tr`
  border-bottom: 1px solid black;
`;

// 테이블 헤더 셀 스타일
const TableHeaderCell = styled.th`
  font-size: 13px;
  text-align: center;
  &:nth-child(1) {
    width: 10%;
  }
  &:nth-child(2) {
    width: 60%;
  }
  &:nth-child(3) {
    width: 20%;
  }
`;

// 테이블 데이터 셀 스타일
const TableCell = styled.td`
  border-bottom: 0.8 solid #bcbdbf;
  text-align: center;
  /* &:nth-child(1) {
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
  } */
`;
const FollowList = ({ handleClickEvent }) => {
  // 로그인 구현이 안돼서 일단 임시로 id입력 받는 코드 구현
  const [dummyId, setDummyId] = useState("");
  const insertDummyId = (e) => {
    setDummyId(e.target.value);
  };
  // 여기까지이고 로그인  구현되면 지울 예정
  const [followList, setFollowList] = useState([]);
  /**
   * 팔로우 리스트 불러오는 useEffect
   */
  useEffect(() => {
    const getFollowList = async () => {
      try {
        const response = await AxiosApi.followList(dummyId);
        if (response.data) {
          setFollowList(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFollowList();
  }, [dummyId]);
  return (
    <>
      <input type="text" value="test" onClick={insertDummyId} />
      <FollowListBoxStyle>
        <FollowListTable>
          <TableRow>
            <TableHeaderCell>순위</TableHeaderCell>
            <TableHeaderCell>팀</TableHeaderCell>
            <TableHeaderCell>?</TableHeaderCell>
          </TableRow>
          {followList.map((list, index) => (
            <TableRow>
              <TableCell key={index}>{index + 1}</TableCell>
              <TableCell>
                <FollowListItem
                  onClick={() => handleClickEvent(list.teamName)}
                  key={index}
                >
                  {list.teamName}
                </FollowListItem>
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          ))}
        </FollowListTable>
      </FollowListBoxStyle>
    </>
  );
};
export default FollowList;
