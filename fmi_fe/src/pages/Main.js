import styled from "styled-components";
import WelcomeContainer from "./WelcomeContainer";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
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
  background-color: lightblue;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Main = () => {
  const [imageURL, setImageURL] = useState("");
  const storageRef = storage.ref();
  // const file =
  //   "https://firebasestorage.googleapis.com/v0/b/fmi-project-e3816.appspot.com/o/footBall_main2.jpg?alt=media&token=423c4dbf-a756-4f5e-85d3-7f73341101ff";
  const fileRef = storageRef.child("footBall_main.jpg");
  const getMainBackgroundImage = async () => {
    const backImageURL = await fileRef.getDownloadURL();
    setImageURL(backImageURL);
  };
  useEffect(() => {
    getMainBackgroundImage();
  }, []);

  // const handleUploadClick = async () => {
  //   if (!file) {
  //     alert("파일을 선택해 주세요.");
  //     return;
  //   }
  //   try {
  //     const storageRef = storage.ref();
  //     const fileRef = storageRef.child(file.name);
  //     await fileRef.put(file); // 파이어베이스에 생성한 스토리지에 파일 업로드
  //     // 업로드 후 이미지 URL 가져오기
  //     const uploadedUrl = await fileRef.getDownloadURL();
  //     console.log(uploadedUrl);
  //     setUrl(uploadedUrl);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <>
      {/* Back 이름 바꾸기 */}
      <MainContainer>
        <Back>
          <img src={imageURL} alt="1" />
          <WelcomeContainer></WelcomeContainer>
        </Back>
      </MainContainer>
    </>
  );
};
export default Main;
