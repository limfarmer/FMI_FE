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
  overflow-y: ${(props) =>
    (props.id ? "scroll" : "none") &&
    (props.followList === null ? "scroll" : "none")};
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
  @media (max-width: 768px) {
    height: 50%;
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
    width: 12%;
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
const NoneUserFollowBox = styled.div`
  background-color: rgba(0, 0, 0, 0.3); /* 반투명 배경 색상 */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #333333;
`;
const NoneFollowBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.div`
  font-size: 14px;
  width: 50%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
`;
const FollowList = ({ handleClickEvent }) => {
  const [followList, setFollowList] = useState([]);
  // 열려있는 모달의 인덱스 번호를 받아 on/off의 상태를 관리하는 hook
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const id = localStorage.getItem("user");
  /**
   * 팔로우 리스트 불러오는 useEffect
   */
  useEffect(() => {
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
  }, [id, isDelete]);
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
      <FollowListBoxStyle id={id} followList={followList}>
        {id ? (
          followList !== null ? (
            <FollowListTable>
              <TableRow>
                <TableHeaderCell>순위</TableHeaderCell>
                <TableHeaderCell>팀</TableHeaderCell>
                <TableHeaderCell>
                  <>수정</>
                </TableHeaderCell>
              </TableRow>
              {followList.map((list, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <FollowListItem
                      onClick={() => handleClickEvent(list.teamName)}
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
                      index={index}
                      id={id}
                      onDelete={() => setIsDelete(!isDelete)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </FollowListTable>
          ) : (
            <NoneFollowBox>팔로우 리스트가 없습니다.</NoneFollowBox>
          )
        ) : (
          <NoneUserFollowBox>
            <TextBox>
              로그인후
              <br />
              팔로우 하기
            </TextBox>
          </NoneUserFollowBox>
        )}
      </FollowListBoxStyle>
    </>
  );
};
export default FollowList;
