import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from 'frontend/src/services/auth';
import { RegisterForm } from 'frontend/src/components/RegisterForm';

// HUMAN ASSISTANCE NEEDED
// The following component may need additional error handling, input validation, and UI improvements for production readiness.
const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;