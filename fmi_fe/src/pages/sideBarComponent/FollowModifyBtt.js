import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faL } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
const IconStyle = styled.div`
  width: 16px;
  text-align: center;
  border-radius: 65%;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;
const ModifyModalStyle = styled.div`
  position: fixed;
  z-index: 100;
  width: auto;
  height: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translate(-97%, -8%);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: 0.1s ease-in-out;
  & ul {
    list-style: none;
    padding: 0;
  }
  & li {
  }
`;
const Btt = styled.button`
  padding: 5px;
  border: none;
  background-color: inherit;
  cursor: pointer;
  & :hover {
    background-color: black;
  }
`;
const FollowModifyBtt = ({
  onClick,
  isOpen,
  closeModal,
  teamName,
  index,
  id,
  onDelete,
}) => {
  // Modal창 의외의 영역 클릭을 DOM으로 제어하기위해 쓰는 Ref
  const modalRef = useRef(null);
  console.log(id, "!");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(id);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // modalRef.current은 형재 클릭한 모달창을 의미( 모달창이 열려있는지 확인/ null이 아닌경우 )
      // !modalRef.current.contains(event.target) -> 모달이 영역이 아닌곳 클릭
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // console.log(!modalRef.current.contains(event.target), "ref");
        closeModal(index);
      }
    };
    // mousedown이벤트가 있을시 handleClickOutside실행
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 메모리 누수방지를 위한 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal, index]);
  //
  // useEffect(() => {
  //   const unfollowTeam = async () => {
  //     try {
  //       await AxiosApi.unfollowTeam(unfollowTeamName);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   unfollowTeam();
  // }, [unfollowTeamName]);
  //
  const clickDelete = async (teamName, id) => {
    console.log("id:", userId);
    try {
      await AxiosApi.unfollowTeam(teamName, userId);

      console.log("팀:", teamName);
      onDelete();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log("delete");
  }, []);
  return (
    <>
      <IconStyle onClick={onClick}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconStyle>
      <ModifyModalStyle ref={modalRef} isOpen={isOpen}>
        <ul>
          <li>수정</li>
          <li>
            <Btt
              onClick={() => clickDelete(teamName)} // 각 버튼에 Ref 할당
            >
              언팔로우
            </Btt>
          </li>
        </ul>
      </ModifyModalStyle>
    </>
  );
};
export default FollowModifyBtt;
