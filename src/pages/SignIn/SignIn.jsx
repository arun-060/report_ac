import React from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    // Logic for handling sign-in goes here (e.g., authentication)
    console.log('Sign In clicked');
    navigate('/dashboard'); // Redirect to dashboard after successful sign-in
  };

  const signChange = (event) => {
    event.preventDefault();
    console.log('Sign-Up clicked');
    navigate('/signup');
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        
        {/* Email input */}
        <input type="email" placeholder="Email" className="input-field" />
        
        {/* Password input */}
        <input type="password" placeholder="Password" className="input-field" />
        
        {/* Sign-in button */}
        <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
        
        {/* Sign-up link */}
        <p>
          Don't have an account? 
          <button className="link-button" onClick={signChange}>Sign-Up</button>
        </p>

        {/* Social Sign-In buttons */}
        <div className="social-signin">
          <button className="social-button google-signin">
            <img src="google.png" alt="Google" className="social-icon" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}