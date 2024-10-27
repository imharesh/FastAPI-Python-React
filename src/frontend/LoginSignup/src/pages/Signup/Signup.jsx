import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import SignupForm from '../../components/auth/SignupForm/SignupForm';

export const Signup = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;