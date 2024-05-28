import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
const Member = styled.span`
  font-weight: bold;
  width: 100%;
  /* height: 100%; */
`;
const WelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
  background-color: transparent;
  color: #fff;
  font-size: 3rem;
  position: absolute;
  left: 15vw;
  bottom: 20vh;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
    height: 20%;
  }
`;

const MainFollowCheckButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 3px solid #fff;
  padding: 10px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.5s ease;
  /* &:hover {
    box-shadow: 4px 4px 8px rgb(0, 0, 0, 0.5);
    transition: box-shadow 0.2s ease-in-out;
  } */
  &:hover {
    color: rgb(240, 90, 153);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px; /* 가상 요소를 li의 아래쪽에 배치 */
    left: 0;
    width: 0;
    border-bottom: 2px solid rgb(240, 90, 153);
    transition: width 250ms ease-in-out;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 30%;
`;

const WelcomeContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  const loginId = localStorage.getItem("user");
  const { logout } = useContext(LoginContext);
  /**
   * 로그인 상태 관리
   */
  useEffect(() => {
    console.log(loginId);
    if (loginId) {
      setIsLogin(true);
    }
  }, [loginId]);
  const navigate = useNavigate();
  const onClick = () => {
    setIsLogin(false);
    alert("로그아웃!");
    navigate("/");
    logout();
  };
  return (
    <>
      <WelcomeBox>
        {isLogin ? (
          <>
            <Member>
              환영합니다! <br />
              {/* 아이디에서 "" 제거 ,아이디 말고 닉네임으로 불러오기 */}
              {loginId.replace(/"/g, "")}님
            </Member>
            <LoginLink>
              <MainFollowCheckButton onClick={onClick}>
                로그아웃
              </MainFollowCheckButton>
            </LoginLink>
          </>
        ) : (
          <>
            <Member>
              환영합니다! <br />
              방문자님
            </Member>
            <LoginLink to="/login">
              <MainFollowCheckButton>로그인</MainFollowCheckButton>
            </LoginLink>
          </>
        )}
      </WelcomeBox>
    </>
  );
};
export default WelcomeContainer;
