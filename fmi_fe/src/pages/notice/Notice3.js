import NoticeLayout from "./NoticeLayout";
import Data from "./Data.json";
import Content from "./Content";

function Notice3() {
  return (
    <NoticeLayout>
      <Content data={Data["Notice"][2]} key="Notice3" />
    </NoticeLayout>
  );
}

export default Notice3;
