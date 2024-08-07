import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './config';
import NavigationTabs from './navigationtabs';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/'); // Redirect to homepage after successful registration
      }, 2000);
      setError(null);
    } catch (error) {
      setError(error.message || 'Registration failed');
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <NavigationTabs/>

      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {showSuccessMessage && <SuccessMessage message="Registration successful! Redirecting to homepage..." />}
    </div>
  );
}

function SuccessMessage({ message }) {
  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  );
}

export default Register;
