import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.backgroundBox} />
        <div className={styles.paper}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;