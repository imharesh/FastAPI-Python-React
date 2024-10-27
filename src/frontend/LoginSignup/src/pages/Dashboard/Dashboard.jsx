import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      setError('Failed to fetch user details');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </div>
          <h2 className={styles.welcomeText}>
            Welcome, {user?.first_name} {user?.last_name}!
          </h2>
        </div>

        <div className={styles.userDetails}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Username</span>
            <span className={styles.value}>{user?.username}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user?.email}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>First Name</span>
            <span className={styles.value}>{user?.first_name}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Last Name</span>
            <span className={styles.value}>{user?.last_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;