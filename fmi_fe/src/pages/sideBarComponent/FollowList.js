import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import FollowModifyBtt from "./FollowModifyBtt";

const FollowListItem = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  cursor: pointer;
`;
const FollowListBoxStyle = styled.div`
  background-color: #f1f1f1;
  width: 80%;
  height: 60%;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px 10px 10px 10px;
  overflow-y: scroll;
  /* 스크롤 디자인 */
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
    border-radius: 0px 10px 10px 0px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }
`;
const FollowListTable = styled.table`
  border-spacing: 0px;
  color: #2e2c2f;
  text-align: start;
  font-size: 1rem;
`;
// 테이블 행 스타일
const TableRow = styled.tr`
  &:nth-of-type(even) {
    background: #d2d2d2;
  }
`;

// 테이블 헤더 셀 스타일
const TableHeaderCell = styled.th`
  font-size: 13px;
  &:nth-child(1) {
    width: 10%;
  }
  &:nth-child(2) {
    width: 80%;
  }
  &:nth-child(3) {
    width: 10%;
  }
`;

// 테이블 데이터 셀 스타일
const TableCell = styled.td`
  border-bottom: 0.8px solid #bcbdbf;
  text-align: start;
  padding-right: 10px;
`;
// 아이콘 hover 스타일

// 수정 버튼 토글 스타일
const NoneUserFollowBox = styled.div``;
const FollowList = ({ handleClickEvent }) => {
  const [followList, setFollowList] = useState([]);
  // 열려있는 모달의 인덱스 번호를 받아 on/off의 상태를 관리하는 hook
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const id = localStorage.getItem("user");
  /**
   * 팔로우 리스트 불러오는 useEffect
   */
  useEffect(() => {
    console.log(id);
    const getFollowList = async () => {
      try {
        const response = await AxiosApi.followList(id.replace(/"/g, ""));
        if (response.data) {
          setFollowList(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFollowList();
  }, [id]);
  /**
   *
   * @param {index} index 클릭한 리스트의 index번호를 parma으로 받음
   * 클릭한 index와 openModalIndex에 저장되어있는 index번호 비교
   * 열려있는 번호외의 리스트를 누를경우 null 값을 넣고 isOpen을 false로 만듬
   */
  const openModal = (index) => {
    if (openModalIndex === index) {
      setOpenModalIndex(null);
    } else {
      setOpenModalIndex(index);
    }
  };

  return (
    <>
      <FollowListBoxStyle>
        {id ? (
          <FollowListTable>
            <TableRow>
              <TableHeaderCell>순위</TableHeaderCell>
              <TableHeaderCell>팀</TableHeaderCell>
              <TableHeaderCell>
                <>수정</>
              </TableHeaderCell>
            </TableRow>
            {followList.map((list, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <FollowListItem
                    onClick={() => handleClickEvent(list.teamName)}
                    key={index}
                  >
                    {list.teamName}
                  </FollowListItem>
                </TableCell>
                <TableCell>
                  {/* 팔로우 리스트 수정버튼 */}
                  <FollowModifyBtt
                    onClick={() => openModal(index)}
                    isOpen={openModalIndex === index}
                    closeModal={() => setOpenModalIndex(null)}
                    teamName={list.teamName}
                    index={index + 1}
                  />
                </TableCell>
              </TableRow>
            ))}
          </FollowListTable>
        ) : (
          <NoneUserFollowBox>로그인하기</NoneUserFollowBox>
        )}
      </FollowListBoxStyle>
    </>
  );
};
export default FollowList;
