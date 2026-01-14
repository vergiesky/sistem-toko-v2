import LoginForm from '../components/login/LoginForm.jsx';
import LoginCard from '../components/login/LoginCard.jsx';
import useLogin from '../hooks/login/useLogin.js';

const Login = () => {
  const { formData, isSubmitting, errorMessage, handleChange, handleLogin } =
    useLogin();

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_620px_at_50%_-10%,#fff3e4_0%,#fde7d2_42%,#f9dcc0_100%)] px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginCard>
          <LoginForm
            formData={formData}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            onChange={handleChange}
            onSubmit={handleLogin}
          />
        </LoginCard>
      </div>
    </div>
  );
};

export default Login;
