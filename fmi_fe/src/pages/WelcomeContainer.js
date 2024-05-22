import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Member = styled.div``;
const NonMember = styled.div``;
const Button = styled.div``;
const WelcomeBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
  position: absolute;
  bottom: 100px;
  left: 100px;
  text-align: center;
`;

const MainFollowCheckButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: blue;
  border: none;
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
            <Member>환영합니다, {loginId}님 </Member>
            <MainFollowCheckButton>
              <LoginLink to="/TeamDetailPage/Arsenal">마이페이지</LoginLink>
            </MainFollowCheckButton>
          </>
        ) : (
          <NonMember>
            환영합니다, 방문자님!
            <Button>
              <LoginLink to="/TeamDetailPage/Arsenal">로그인</LoginLink>
            </Button>
          </NonMember>
        )}
      </WelcomeBox>
    </>
  );
};
export default WelcomeContainer;
