import styles from "./NoticeLayout.module.css";

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
