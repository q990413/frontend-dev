import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './config';
import NavigationTabs from './navigationtabs';
function Login() {
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
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Incorrect email or password');
      }
      const data = await response.json();
      const { token } = data;
      // Save token to local storage
      localStorage.setItem('token', token);
      // Show success message
      setShowSuccessMessage(true);
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      setError(null);
    } catch (error) {
      setError('Incorrect email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <NavigationTabs/>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      {showSuccessMessage && <SuccessMessage />}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="success-message">
      <p>Login successful! Redirecting to homepage...</p>
    </div>
  );
}

export default Login;
