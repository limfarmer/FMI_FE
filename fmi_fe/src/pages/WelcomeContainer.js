import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Member = styled.h2``;
const Button = styled.div``;
const WelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 300px;
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
`;

const WelcomeContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  localStorage.setItem("login", "TRUE"); // 아직 로그인 페이지가 완성 안돼서 임시로 true로 박고 나중에 id값 받아올 예정
  const loginId = localStorage.getItem("login");
  /**
   * 로그인 상태 관리
   */
  useEffect(() => {
    if (loginId === "TRUE") {
      setIsLogin(true);
    }
  }, [loginId]);

  return (
    <>
      <WelcomeBox>
        {isLogin ? (
          <>
            <Member>환영합니다! {loginId}님 </Member>
            <LoginLink to="/TeamDetailPage/Arsenal">
              <MainFollowCheckButton>마이페이지</MainFollowCheckButton>
            </LoginLink>
          </>
        ) : (
          <Member>
            환영합니다! 방문자님
            <Button>
              <LoginLink to="/TeamDetailPage/Arsenal">로그인</LoginLink>
            </Button>
          </Member>
        )}
      </WelcomeBox>
    </>
  );
};
export default WelcomeContainer;
