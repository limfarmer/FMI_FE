import NoticeLayout from "./NoticeLayout";
import Data from "./Data.json";
import Content from "./Content";

function Notice4() {
  return (
    <NoticeLayout>
      <Content data={Data["Notice"][3]} key="Notice4" />
    </NoticeLayout>
  );
}

export default Notice4;
