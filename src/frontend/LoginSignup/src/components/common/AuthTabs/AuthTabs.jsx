import { useNavigate } from 'react-router-dom';
import styles from './AuthTabs.module.css';

export const AuthTabs = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.tabContainer}>
      <button 
        className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button 
        className={`${styles.tab} ${activeTab === 'signup' ? styles.active : ''}`}
        onClick={() => navigate('/signup')}
      >
        Signup
      </button>
    </div>
  );
};