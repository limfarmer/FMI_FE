import styles from "./Layout.module.css";

function NoticeLayout({ children }) {
  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default NoticeLayout;
