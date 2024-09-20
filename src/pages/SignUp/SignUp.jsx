import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();



  const signChange=(event)=>{
    event.preventDefault()
    console.log("cliicked")
    navigate('/sign-in')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up with:', { username, email, password });
    // Here you would typically send the data to your backend
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
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="sign-up-button">Sing Up</button>
        </form>
        <p>Already have an account? 
          <button onClick={signChange}>Sign-In</button>
        </p>
        <div className="social-signup">
          <button className="google-signup">
            <img src="/placeholder.svg?height=24&width=24" alt="Sign up with Google" />
          </button>
          <button className="github-signup">
            <img src="/placeholder.svg?height=24&width=24" alt="Sign up with GitHub" />
          </button>
        </div>
      </div>
    </div>
  );
}