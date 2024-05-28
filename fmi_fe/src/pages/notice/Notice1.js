import NoticeLayout from "./NoticeLayout";
import Data from "./Data.json";
import Content from "./Content";

function Notice1() {
  return (
    <NoticeLayout>
      <Content data={Data["Notice"][0]} key="Notice1" />
    </NoticeLayout>
  );
}

export default Notice1;
