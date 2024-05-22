import styled from "styled-components";
import WelcomeContainer from "./WelcomeContainer";
import { useEffect, useMemo, useState } from "react";
import { storage } from "../api/firebase";

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
`;

const Back = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.9s ease-in-out;
`;
// firebase에 저장되어있는 사진 부르는 방법
// const storageRef = storage.ref();
// const fileRef = storageRef.child(`${imgNum}.jpg`);
// const getMainBackgroundImage = async () => {
//   try {
//     const backImageURL = await fileRef.getDownloadURL();
//     setImageURL(backImageURL);
//     setLoaded(true); // 이미지가 로드되면 loaded 상태를 true로 변경합니다.
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// };

const Main = () => {
  const [imageURL, setImageURL] = useState("");
  const [loaded, setLoaded] = useState(false);
  // 1부터 9까지의 이미지를 불러와서 배열에 저장
  const images = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) =>
        require(`../images/${index + 1}.jpg`)
      ),
    []
  );

  //${imgNum}

  useEffect(() => {
    const imgNum = Math.floor(Math.random() * 9); // 0부터 8까지의 랜덤한 숫자를 생성
    setImageURL(images[imgNum]);
    setLoaded(true);
  }, [loaded]); // 이미지 로드 시점을 변경해줘야 합니다.

  // const onInsert = useCallback(() => {
  //   const imgNum = Math.floor(Math.random() * 9); // 0부터 8까지의 랜덤한 숫자를 생성
  //   setImageURL(images[imgNum]);
  //   setLoaded(true);
  // }, [imageURL, loaded]);
  return (
    <MainContainer>
      <Back>
        <Image src={imageURL} alt="background_image" loaded={loaded} />
        <WelcomeContainer />
      </Back>
    </MainContainer>
  );
};

export default Main;
