import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '../../common/TextField/TextField';
import Button from '../../common/Button/Button';
import {AuthTabs} from '../../common/AuthTabs/AuthTabs';
import { signupUser } from '../../../services/authService';
import styles from './SignupForm.module.css';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username should be at least 3 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  first_name: yup
    .string()
    .required('First name is required'),
  last_name: yup
    .string()
    .required('Last name is required'),
  password: yup
    .string()
    .min(5, 'Password should be at least 5 characters')
    .required('Password is required'),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Add your API call here
        setIsLoading(true);
        setApiError('');
        await signupUser(values);
        navigate('/login');
      } catch (error) {
        setApiError(error.detail || 'Signup failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.formContainer}>
      <AuthTabs activeTab="signup" />

      {apiError && (
        <div className={styles.errorMessage}>
          {apiError}
        </div>
      )}

      
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.nameFields}>
          <TextField
            name="first_name"
            placeholder="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && formik.errors.first_name}
          />

          <TextField
            name="last_name"
            placeholder="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && formik.errors.last_name}
          />
        </div>

        <TextField
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && formik.errors.username}
        />

        <TextField
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
        />

        <TextField
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />

        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>    
      </form>
    </div>
  );
};

export default SignupForm;


