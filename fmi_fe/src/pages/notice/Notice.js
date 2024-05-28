import Layout from "./NoticeLayout";
import Data from "./Data.json";
import Title from "./Title";

function Notice() {
  return (
    <Layout>
      {Data["Notice"].map(function (data, index) {
        return <Title data={data} key={`Notice-${index}`} />;
      })}
    </Layout>
  );
}

export default Notice;
