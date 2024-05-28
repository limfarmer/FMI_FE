import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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
  transition: color 0.5s ease;
  &:hover {
    color: #2e2c2f;
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
    localStorage.clear();
    setIsLogin(false);
    alert("로그아웃!");
    navigate("/");
  };
  return (
    <>
      <WelcomeBox>
        {isLogin ? (
          <>
            <Member>
              환영합니다! <br />
              {/* 아이디에서 "" 제거 */}
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
