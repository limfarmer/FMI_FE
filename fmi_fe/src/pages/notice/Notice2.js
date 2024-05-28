import NoticeLayout from "./NoticeLayout";
import Data from "./Data.json";
import Content from "./Content";

function Notice2() {
  return (
    <NoticeLayout>
      <Content data={Data["Notice"][1]} key="Notice2" />
    </NoticeLayout>
  );
}

export default Notice2;
