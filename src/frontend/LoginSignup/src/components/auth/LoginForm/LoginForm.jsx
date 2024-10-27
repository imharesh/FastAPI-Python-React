import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextField from '../../common/TextField/TextField';
import Button from '../../common/Button/Button';
import {AuthTabs} from '../../common/AuthTabs/AuthTabs';
import { loginUser } from '../../../services/authService';
import styles from './LoginForm.module.css';
import { useState } from 'react';


const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setApiError('');
        const response = await loginUser(values);
        
        // Store the token
        localStorage.setItem('token', response.access_token);
        
        // You can also store user info if needed
        localStorage.setItem('user', JSON.stringify({
          username: values.username,
        }));

        // Redirect to dashboard or home page
        navigate('/dashboard');
      } catch (error) {
        setApiError(error.detail || 'Invalid username or password');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.formContainer}>
      <AuthTabs activeTab="login" />
      
      {apiError && (
        <div className={styles.errorMessage}>
          {apiError}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && formik.errors.username}
        />

        <TextField
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />

        <div className={styles.forgotPassword}>
          <button 
            type="button" 
            className={styles.forgotButton}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>

        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;