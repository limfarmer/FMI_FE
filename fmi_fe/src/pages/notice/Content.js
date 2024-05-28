import styles from "./Content.module.css";

function Content({ data }) {
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.text}>{data.title}</td>
          </tr>
          <tr>
            <td className={styles.date}>{data.date}</td>
          </tr>
          <tr>
            <td className={styles.content}>{data.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Content;
