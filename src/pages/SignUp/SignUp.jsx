import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Navigate to Sign-In
  const signChange = (event) => {
    event.preventDefault();
    console.log('Sign-In clicked');
    navigate('/signin');
  };

  // Handle Sign-Up form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up with:', { username, email, password });
    // Here you would typically send the data to your backend for processing.
    navigate('/sign-in'); // Navigate to Sign-In after successful registration (for example)
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>
        <p>Already have an account? 
          <button className="link-button" onClick={signChange}>Sign-In</button>
        </p>
        <div className="social-signup">
          <button className="social-button google-signup">
            <img src="/google.png" alt="Google" className="social-icon" /> Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
