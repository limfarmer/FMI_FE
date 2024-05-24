import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Member = styled.span`
  font-size: 150%;
  font-weight: bold;
  width: 100%;
  /* height: 100%; */
`;
const WelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  height: 40%;
  background-color: transparent;
  color: #fff;
  font-size: 2rem;
  position: absolute;
  left: 15vw;
  bottom: 20vh;
  text-align: center;
`;

const MainFollowCheckButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 30%;
`;

const WelcomeContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  localStorage.setItem("login", "임정후"); // 아직 로그인 페이지가 완성 안돼서 임시로 true로 박고 나중에 id값 받아올 예정
  const loginId = localStorage.getItem("login");
  /**
   * 로그인 상태 관리
   */
  useEffect(() => {
    if (loginId === "임정후") {
      setIsLogin(true);
    }
  }, [loginId]);

  return (
    <>
      <WelcomeBox>
        {loginId ? (
          <>
            <Member>
              환영합니다! <br />
              {loginId}님{" "}
            </Member>
            <LoginLink to="/mypage">
              <MainFollowCheckButton>마이페이지</MainFollowCheckButton>
            </LoginLink>
          </>
        ) : (
          <>
            <Member>환영합니다! 방문자님</Member>
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
