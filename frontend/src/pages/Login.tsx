import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'frontend/src/services/auth';
import { LoginForm } from 'frontend/src/components/LoginForm';

// HUMAN ASSISTANCE NEEDED
// The confidence level is below 0.8, so this component may need review and potential improvements.
// Please check the error handling, state management, and overall structure.

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;