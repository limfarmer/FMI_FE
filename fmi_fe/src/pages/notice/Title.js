import { Link } from "react-router-dom";
import styles from "./Title.module.css";

function Title({ data }) {
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.text}>
              <Link to={`/notice/${data.no}`} className={styles.link}>
                {data.title}
              </Link>
            </td>
            <td className={styles.text}>{data.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Title;
